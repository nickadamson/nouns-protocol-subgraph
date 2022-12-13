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
} from "../generated/ManagerImpl/Governor";
import { GovernorContract, Proposal, Vote } from "../generated/schema";
import { ZERO_ADDRESS } from "../utils/constants";
import { findOrCreateAccount } from "./manager-impl";

export function handleProposalCreated(event: ProposalCreated): void {
  const governorAddr = event.address.toHexString();
  const submitterAddr = event.transaction.from.toHexString();
  const submitter = findOrCreateAccount(submitterAddr);
  const _targets = event.params.targets;
  const targets: string[] = [];
  for (let i = 0; i < _targets.length; i++) {
    targets.push(_targets[i].toHexString());
  }

  let newProposal = new Proposal(event.params.proposalId.toHexString());
  newProposal.status = "PENDING";
  newProposal.targets = targets;
  newProposal.values = event.params.values;
  newProposal.calldatas = event.params.calldatas;
  newProposal.description = event.params.description;
  newProposal.descriptionHash = event.params.descriptionHash;
  newProposal.governorContract = governorAddr;
  newProposal.submitter = submitter.id;

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
  const proposalId = event.params.proposalId.toHexString();
  const voterAddr = event.params.voter.toHexString();
  const voter = findOrCreateAccount(voterAddr);
  const vote = event.params.support.toI32();
  const voteString = vote === 0 ? "FOR" : vote === 1 ? "AGAINST" : "ABSTAIN";

  let proposal = Proposal.load(proposalId)!;
  const forVotes = proposal.forVotes;
  const againstVotes = proposal.againstVotes;
  const abstainVotes = proposal.abstainVotes;
  proposal.forVotes = vote === 0 ? forVotes.plus(BigInt.fromI32(1)) : forVotes;
  proposal.againstVotes =
    vote === 1 ? againstVotes.plus(BigInt.fromI32(1)) : againstVotes;
  proposal.abstainVotes =
    vote === 0 ? abstainVotes.plus(BigInt.fromI32(1)) : abstainVotes;
  proposal.save();

  let newVote = new Vote(event.transaction.hash.toHexString());
  newVote.supported = voteString;
  newVote.reason = event.params.reason;
  newVote.weight = event.params.weight;
  newVote.proposal = proposal.id;
  newVote.voter = voter.id;
  newVote.save();
}

export function handleVotingDelayUpdated(event: VotingDelayUpdated): void {}

export function handleVotingPeriodUpdated(event: VotingPeriodUpdated): void {}

export function handleGovernorOwnerUpdated(event: GovernorOwnerUpdated): void {}
