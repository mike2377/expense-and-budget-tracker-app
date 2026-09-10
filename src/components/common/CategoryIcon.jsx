import {
  Wallet,
  Briefcase,
  UtensilsCrossed,
  Car,
  Home,
  Gamepad2,
  Heart,
  ShoppingBag,
  GraduationCap,
  TrendingUp,
  Circle,
} from "lucide-react";

const ICON_MAP = {
  Wallet,
  Briefcase,
  UtensilsCrossed,
  Car,
  Home,
  Gamepad2,
  Heart,
  ShoppingBag,
  GraduationCap,
  TrendingUp,
};

export const CategoryIcon = ({
  iconName,
  size = 20,
  color,
  className = "",
}) => {
  const IconComponent = ICON_MAP[iconName] || Circle;
  return <IconComponent size={size} color={color} className={className} />;
};
