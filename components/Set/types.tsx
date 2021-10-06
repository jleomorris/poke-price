export interface IProps {
  set: {
    name: string;
    id: string;
  };
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
