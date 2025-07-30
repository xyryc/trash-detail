import { GestureResponderEvent } from "react-native";

type ButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  icon?: ReactNode;
};

type EmployeeHeaderProps = {
  name: string;
  email: string;
};

type ProblemItem = {
  id: number;
  image: string;
  problemCode: string;
  problemStatus: string;
  customerCode: string;
  location: string;
  date: string;
  status: string;
};
