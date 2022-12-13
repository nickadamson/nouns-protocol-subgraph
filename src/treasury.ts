import {
  DelayUpdated,
  GracePeriodUpdated,
  TransactionScheduled,
  TransactionCanceled,
  TransactionExecuted,
  TreasuryOwnerUpdated,
} from "../generated/ManagerImpl/Treasury";

export function handleDelayUpdated(event: DelayUpdated): void {}
export function handleGracePeriodUpdated(event: GracePeriodUpdated): void {}
export function handleTransactionScheduled(event: TransactionScheduled): void {}
export function handleTransactionCanceled(event: TransactionCanceled): void {}
export function handleTransactionExecuted(event: TransactionExecuted): void {}
export function handleTreasuryOwnerUpdated(event: TreasuryOwnerUpdated): void {}
