import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink
        target="_blank"
        href="https://t.me/joinchat/SRwcEBxNsBIidoCL8v3lqg"
      >
        Telegram
      </StyledLink>

      <StyledLink target="_blank" href="https://twitter.com/Los_Dorados_NFT">
        Twitter
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.white};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[200]};
  }
`

export default Nav

/*
      <StyledLink
        target="_blank"
        href="https://uniswap.info/pair/0xa4476ff0c5b543f830cc237721d22d29f5ad9a24"
      >
        Uniswap LOD-ETH
      </StyledLink>
      <StyledLink
        target="_blank"
        href="https://etherscan.io/address/0xc2edad668740f1aa35e4d8f227fb8e17dca888cd#code"
      >
        LOD Contract
      </StyledLink>
      <StyledLink target="_blank" href="https://github.com/lodswap">
        Github
      </StyledLink>
*/
