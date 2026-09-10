import { useContext } from "react";
import { BudgetsContext } from "../contexts/BudgetsContext";

export const useBudgets = () => {
  const context = useContext(BudgetsContext);
  if (!context)
    throw new Error("useBudgets must be use in BudgetsProvider");
  return context;
};
