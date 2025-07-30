import { GestureResponderEvent } from "react-native";

type ButtonPrimaryProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
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
