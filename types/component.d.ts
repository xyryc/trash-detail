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
