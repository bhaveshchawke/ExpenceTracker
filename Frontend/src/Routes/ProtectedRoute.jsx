import { UseAuthData } from "../Hooks/UseAuthData";
import { useNavigate } from "react-router";
import { UseMessage } from "../Hooks/UseMessage";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = UseAuthData();
  const { showMessage } = UseMessage();
  const navigate = useNavigate();

  // Message tabhi dikhao jab loading khtam ho jaye aur user logged in na ho
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      showMessage("Please Login First", "error");
    }
  }, [loading, isLoggedIn, showMessage]);

  // Jab tak backend se data aa raha hai, tab tak wait karo (Redirect mat karo)
  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        Loading...
      </div>
    );
  }

  // Agar loading khtam ho gayi aur user logged in hai, to page dikhao
  if (isLoggedIn) {
    return <>{children}</>;
  } else {
    // Warna login par bhej do
    return navigate("/login");
  }
};
