import { ManagerUpgraded as ManagerUpgradedEvent } from "../generated/Manager/Manager";
// import { ManagerUpgraded } from "../generated/schema";

export function handleManagerUpgraded(event: ManagerUpgradedEvent): void {
  // let entity = new ManagerUpgraded(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // );
  // entity.impl = event.params.impl;
  // entity.blockNumber = event.block.number;
  // entity.blockTimestamp = event.block.timestamp;
  // entity.transactionHash = event.transaction.hash;
  // entity.save();
}
