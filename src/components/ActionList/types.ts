export type ActionListItemProps = {
  title: string;
  route: string;
  onPress?(item?: string | any, isSignedIn?: boolean): void;
};

export type ActionListProps = {
  items: ActionListItemProps[];
};
