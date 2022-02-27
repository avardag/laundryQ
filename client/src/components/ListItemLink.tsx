import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
//RR
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

export default function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to">>(
        function Link(itemProps, ref) {
          return (
            <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />
          );
        }
      ),
    [to]
  );
  return (
    <ListItem button component={renderLink}>
      {icon ? (
        <ListItemIcon
          sx={{
            minWidth: {
              xs: 26, // theme.breakpoints.up('xs')
              sm: 40, // theme.breakpoints.up('sm')
              md: 46, // theme.breakpoints.up('md')
              lg: 56, // theme.breakpoints.up('lg')
            },
          }}
        >
          {icon}
        </ListItemIcon>
      ) : null}
      <ListItemText primary={primary} />
    </ListItem>
  );
}
