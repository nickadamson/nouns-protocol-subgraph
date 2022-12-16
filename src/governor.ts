import { BigInt } from "@graphprotocol/graph-ts";
import {
  ProposalCreated,
  ProposalCanceled,
  ProposalQueued,
  ProposalVetoed,
  ProposalExecuted,
  ProposalThresholdBpsUpdated,
  QuorumVotesBpsUpdated,
  VetoerUpdated,
  VoteCast,
  VotingDelayUpdated,
  VotingPeriodUpdated,
  GovernorOwnerUpdated,
} from "../generated/templates/GovernorContract/Governor";
import { GovernorContract, Proposal, Vote } from "../generated/schema";
import { ZERO_ADDRESS } from "../utils/constants";
import { findOrCreateAccount } from "../utils/helpers";

export function handleProposalCreated(event: ProposalCreated): void {
  const governorAddr = event.address.toHexString();
  const submitterAddr = event.transaction.from.toHexString();
  const submitter = findOrCreateAccount(submitterAddr);

  const _description = event.params.description;
  const detailsArray = _description.split("&&");

  const _targets = event.params.targets;
  const targets: string[] = [];
  for (let i = 0; i < _targets.length; i++) {
    targets.push(_targets[i].toHexString());
  }

  let newProposal = new Proposal(event.params.proposalId.toHexString());
  newProposal.status = "PENDING";

  let governorContract = GovernorContract.load(governorAddr)!;
  newProposal.number = governorContract.nextProposalNumber;
  governorContract.nextProposalNumber = governorContract.nextProposalNumber.plus(
    BigInt.fromI32(1)
  );
  governorContract.save();

  newProposal.targets = targets;
  newProposal.values = event.params.values;
  newProposal.calldatas = event.params.calldatas;
  newProposal.title = detailsArray[0];
  newProposal.description = detailsArray[1];
  newProposal.descriptionHash = event.params.descriptionHash;
  newProposal.governorContract = governorAddr;
  newProposal.submitter = submitter.id;
  newProposal.blockTimestamp = event.block.timestamp;
  newProposal.creationTxHash = event.transaction.hash;

  newProposal.forVotes = BigInt.fromI32(0);
  newProposal.againstVotes = BigInt.fromI32(0);
  newProposal.abstainVotes = BigInt.fromI32(0);

  newProposal.save();
}

export function handleProposalCanceled(event: ProposalCanceled): void {
  const proposalId = event.params.proposalId.toHexString();

  let proposal = Proposal.load(proposalId)!;
  proposal.status = "CANCELLED";
  proposal.save();
}

export function handleProposalQueued(event: ProposalQueued): void {
  const proposalId = event.params.proposalId.toHexString();

  let proposal = Proposal.load(proposalId)!;
  proposal.status = "QUEUED";
  proposal.save();
}

export function handleProposalVetoed(event: ProposalVetoed): void {
  const proposalId = event.params.proposalId.toHexString();

  let proposal = Proposal.load(proposalId)!;
  proposal.status = "VETOED";
  proposal.save();
}

export function handleProposalExecuted(event: ProposalExecuted): void {
  const proposalId = event.params.proposalId.toHexString();

  let proposal = Proposal.load(proposalId)!;
  proposal.status = "EXECUTED";
  proposal.save();
}

export function handleProposalThresholdBpsUpdated(
  event: ProposalThresholdBpsUpdated
): void {
  const governorAddr = event.address.toHexString();

  let governorContract = GovernorContract.load(governorAddr)!;
  governorContract.proposalThreshold = event.params.newBps;
  governorContract.save();
}

export function handleQuorumVotesBpsUpdated(
  event: QuorumVotesBpsUpdated
): void {
  const governorAddr = event.address.toHexString();

  let governorContract = GovernorContract.load(governorAddr)!;
  governorContract.quoromThreshold = event.params.newBps;
  governorContract.save();
}

export function handleVetoerUpdated(event: VetoerUpdated): void {
  const governorAddr = event.address.toHexString();
  const vetoerAddr = event.params.newVetoer.toHexString();
  const vetoEnabled = vetoerAddr === ZERO_ADDRESS.toHexString();

  let governorContract = GovernorContract.load(governorAddr)!;
  governorContract.vetoerAddress = event.params.newVetoer;
  governorContract.vetoEnabled = vetoEnabled;
  governorContract.save();
}

export function handleVoteCast(event: VoteCast): void {
  // TODO: handle delegations?
  // const governorAddr = event.address.toHexString();
  // const governorContract = GovernorContract.load(governorAddr)!;
  // const tokenContractAddr = governorContract.tokenContract;
  const proposalId = event.params.proposalId.toHexString();
  const voterAddr = event.params.voter.toHexString();
  const voter = findOrCreateAccount(voterAddr);
  const vote = event.params.support.toI32();
  const voteString = vote === 0 ? "AGAINST" : vote === 1 ? "FOR" : "ABSTAIN";

  let proposal = Proposal.load(proposalId)!;
  const forVotes = proposal.forVotes;
  const againstVotes = proposal.againstVotes;
  const abstainVotes = proposal.abstainVotes;

  proposal.forVotes = vote === 1 ? forVotes.plus(BigInt.fromI32(1)) : forVotes;
  proposal.againstVotes =
    vote === 0 ? againstVotes.plus(BigInt.fromI32(1)) : againstVotes;
  proposal.abstainVotes =
    vote === 2 ? abstainVotes.plus(BigInt.fromI32(1)) : abstainVotes;
  proposal.save();

  let newVote = new Vote(event.transaction.hash.toHexString());
  newVote.supported = voteString;
  newVote.reason = event.params.reason;
  newVote.weight = event.params.weight;
  newVote.proposal = proposal.id;
  newVote.voter = voter.id;
  newVote.blockTimestamp = event.block.timestamp;
  newVote.save();
}

export function handleVotingDelayUpdated(event: VotingDelayUpdated): void {
  const governorAddr = event.address.toHexString();
  const newVotingDelay = event.params.newVotingDelay;

  let gov = GovernorContract.load(governorAddr)!;
  gov.votingDelay = newVotingDelay;
  gov.save();
}

export function handleVotingPeriodUpdated(event: VotingPeriodUpdated): void {
  const governorAddr = event.address.toHexString();
  const newVotingPeriod = event.params.newVotingPeriod;

  let gov = GovernorContract.load(governorAddr)!;
  gov.votingPeriod = newVotingPeriod;
  gov.save();
}

export function handleGovernorOwnerUpdated(event: GovernorOwnerUpdated): void {
  const governorAddr = event.address.toHexString();
  const newOwner = event.params.newOwner.toHexString();

  let gov = GovernorContract.load(governorAddr)!;
  gov.owner = newOwner;
  gov.save();
}
