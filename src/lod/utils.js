import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getMasterChefAddress = (lod) => {
  return lod && lod.masterChefAddress
}
export const getlodAddress = (lod) => {
  return lod && lod.lodAddress
}
export const getWethContract = (lod) => {
  return lod && lod.contracts && lod.contracts.weth
}
export const getMasterChefContract = (lod) => {
  return lod && lod.contracts && lod.contracts.masterChef
}
export const getmDistributorContract = (lod) => {
  return lod && lod.contracts && lod.contracts.mDistributor
}
export const getlDistributorContract = (lod) => {
  return lod && lod.contracts && lod.contracts.lDistributor
}
export const getsDistributorContract = (lod) => {
  return lod && lod.contracts && lod.contracts.sDistributor
}
export const getTreasuryAddress = (lod) => {
  return lod && lod.treasuryAddress
}
export const getLodContract = (lod) => {
  return lod && lod.contracts && lod.contracts.lod
}

export const getFarms = (lod) => {
  return lod
    ? lod.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'LOD',
          earnTokenAddress: lod.contracts.lod.options.address,
          icon,
        }),
      )
    : []
}

export const getPoolWeight = async (masterChefContract, pid) => {
  const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterChefContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (distributor, pid, account) => {
  return distributor.methods.pendingRewards(account).call()
}

export const getStakingEarned = async (distributor, pid, account) => {
  return distributor.methods.pendingLod(account).call()
}

export const getTotalLPWethValue = async (
  masterChefContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods
    .balanceOf(masterChefContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total weth value for the lpContract = w1
  const lpContractWeth = await wethContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))
  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(masterChefContract, pid),
  }
}

export const approve = async (token, distributor, account) => {
  return token.methods
    .approve(distributor.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const getLodSupply = async (lod) => {
  return new BigNumber(await lod.contracts.lod.methods.totalSupply().call())
}

export const stake = async (distributor, pid, amount, account) => {
  return distributor.methods
    .deposit(
      account,
      account,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (distributor, pid, amount, account) => {
  return distributor.methods
    .withdraw(
      account,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (distributor, pid, account) => {
  return distributor.methods
    .deposit(account, account, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (distributor, account) => {
  try {
    const { amount } = await distributor.methods.userInfo(account).call()
    console.log(amount)
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const getUnclaimed = async (distributor, account) => {
  try {
    let sum = 0
    const rounds = await distributor.methods.round().call()
    for (let i = 0; i < rounds; i++) {
      const amount = await distributor.methods.checkReward(i, account).call()
      sum += amount
    }
    return new BigNumber(sum)
  } catch {
    return new BigNumber(0)
  }
}

export const getRemainingReward = async (lod, treasury) => {
  try {
    let reward = await lod.methods.balanceOf(treasury).call()
    return new BigNumber(reward)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (masterChefContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const claim = async (distributor, account) => {
  let rounds = []
  const round = await distributor.methods.round().call()
  for (let i = 0; i < round; i++) {
    const amount = await distributor.methods.checkReward(i, account).call()
    if (amount > 0) {
      rounds.push(i)
    }
  }
  return await distributor.methods
    .withdrawRewardAll(rounds, account)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
