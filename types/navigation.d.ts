interface NavItem {
  id: ScreenType;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}

type ScreenType = "customer" | "employee" | "admin";
