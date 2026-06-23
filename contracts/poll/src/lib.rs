#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, vec, Env, Vec, Address, String as SorobanString,
};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct PollInfo {
    pub question: SorobanString,
    pub options: Vec<SorobanString>,
    pub deadline: u64,
    pub owner: Address,
    pub total_votes: u32,
}

#[contracttype]
pub enum DataKey {
    Poll,
    Voter(Address),
    Results(u32),
}

#[contract]
pub struct PollContract;

#[contractimpl]
impl PollContract {
    pub fn initialize(
        env: Env,
        owner: Address,
        question: SorobanString,
        options: Vec<SorobanString>,
        deadline: u64,
    ) {
        assert!(!options.is_empty(), "need at least 1 option");
        assert!(deadline > env.ledger().timestamp(), "deadline in past");

        let poll = PollInfo {
            question,
            options,
            deadline,
            owner,
            total_votes: 0,
        };
        env.storage().instance().set(&DataKey::Poll, &poll);
    }

    pub fn vote(env: Env, voter: Address, option_index: u32) {
        voter.require_auth();

        let poll: PollInfo = env
            .storage()
            .instance()
            .get(&DataKey::Poll)
            .expect("not initialized");

        assert!(
            env.ledger().timestamp() < poll.deadline,
            "voting has ended"
        );
        assert!(option_index < (poll.options.len() as u32), "invalid option");

        assert!(
            env.storage()
                .instance()
                .get::<_, bool>(&DataKey::Voter(voter.clone()))
                .is_none(),
            "already voted"
        );

        env.storage()
            .instance()
            .set(&DataKey::Voter(voter.clone()), &true);

        let mut count: u32 = env
            .storage()
            .instance()
            .get(&DataKey::Results(option_index))
            .unwrap_or(0);
        count += 1;
        env.storage()
            .instance()
            .set(&DataKey::Results(option_index), &count);

        let mut updated = poll.clone();
        updated.total_votes += 1;
        env.storage().instance().set(&DataKey::Poll, &updated);

        env.events().publish(
            ("poll", "voted"),
            (voter, option_index, env.ledger().timestamp()),
        );
    }

    pub fn get_poll(env: Env) -> PollInfo {
        env.storage()
            .instance()
            .get(&DataKey::Poll)
            .expect("not initialized")
    }

    pub fn get_results(env: Env, option_count: u32) -> Vec<u32> {
        let mut results = vec![&env];
        for i in 0..option_count {
            let count: u32 = env
                .storage()
                .instance()
                .get(&DataKey::Results(i))
                .unwrap_or(0);
            results.push_back(count);
        }
        results
    }

    pub fn has_voted(env: Env, voter: Address) -> bool {
        env.storage()
            .instance()
            .get::<_, bool>(&DataKey::Voter(voter))
            .unwrap_or(false)
    }
}
