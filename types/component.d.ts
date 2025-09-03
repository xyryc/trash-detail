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
  isLoading?: boolean;
  icon?: ReactNode;
  className?: string;
  textColor?: string;
};

type HeaderProps = {
  title?: string;
  name?: string;
  email?: string;
};

type ProblemItem = {
  id?: number;
  image: string;
  problemCode: string;
  problemStatus: string;
  customerCode: string;
  location: string;
  date: string;
  status: string;
};

type StepFormData = {
  imageUri?: string | null;
  location?: string;
  problemTitle?: string;
  additionalNotes?: string;
  customerId?: string;
  reportedDate?: string;
};

type StepComponentProps = {
  data: StepFormData;
  onComplete: (data: StepFormData) => void;
  onBack?: () => void;
  entering?: EnteringAnimation;
  exiting?: ExitingAnimation;
  layout?: LayoutAnimation;
  imageUri?: string | null;
  goToStep?: (step: number) => void;
  isLoading?: boolean;
};

type CameraStepProps = {
  onComplete: (data: { imageUri: string }) => void; // Explicitly requires imageUri
  onBack?: () => void;
  entering?: EnteringAnimation;
  exiting?: ExitingAnimation;
  layout?: LayoutAnimation;
};

type SearchBarProps = {
  className?: string;
};

type Customer = {
  _id: string;
  __v: number;
  userId: string;
  name: string;
  email: string;
  addressLane1: string;
  addressLane2?: string;
  city: string;
  state: string;
  zipCode: string;
  passwordResetVerified: boolean;
};

type CustomerListProps = {
  customer: Customer;
  isSelected: boolean;
  onPress?: (customer: Customer) => void;
};
