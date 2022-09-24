import { styled } from "@mui/material";

const StyledNavLink = styled("p")((props) => ({
  "&:hover": {
    cursor: "pointer",
    textDecoration: "underline",
  },
  fontWeight: "normal",
}));

interface INavLinkProps {
  text: string;
  onClick?: () => void;
}
export function NavLink(props: INavLinkProps) {
  return <StyledNavLink onClick={props.onClick}>{props.text}</StyledNavLink>;
}
