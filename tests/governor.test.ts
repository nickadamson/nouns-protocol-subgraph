import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { GovernorInitialized } from "../generated/schema"
import { GovernorInitialized as GovernorInitializedEvent } from "../generated/Governor/Governor"
import { handleGovernorInitialized } from "../src/governor"
import { createGovernorInitializedEvent } from "./governor-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let version = BigInt.fromI32(234)
    let newGovernorInitializedEvent = createGovernorInitializedEvent(version)
    handleGovernorInitialized(newGovernorInitializedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("GovernorInitialized created and stored", () => {
    assert.entityCount("GovernorInitialized", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "GovernorInitialized",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "version",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
