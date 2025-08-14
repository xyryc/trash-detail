import { GestureResponderEvent } from "react-native";
import {
  EnteringAnimation,
  ExitingAnimation,
  LayoutAnimation,
} from "react-native-reanimated";

type ButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
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

export type StepComponentProps = {
  onComplete: () => void;
  onBack?: () => void;
  entering?: EnteringAnimation;
  exiting?: ExitingAnimation;
  layout?: LayoutAnimation;
  imageUri?: string | null;
  goToStep?: (step: number) => void;
};

export type CameraStepProps = {
  onComplete: (data: { imageUri: string }) => void; // Explicitly requires imageUri
  onBack?: () => void;
  entering?: EnteringAnimation;
  exiting?: ExitingAnimation;
  layout?: LayoutAnimation;
};

export type SearchBarProps = {
  className?: string;
};
