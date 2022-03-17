import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserPage from "./pages/UserPage";

function App() {
   return (
      <div>
         <a href="/" title="Home">
            Home
         </a>
         <a href="/signup" title="Sign Up">
            Sign Up
         </a>
         {window.location.pathname === "/" && <HomePage />}
         {window.location.pathname === "/login" && <LoginPage />}
         {window.location.pathname === "/signup" && <SignUpPage />}
         {window.location.pathname.startsWith("/user/") && <UserPage />}
      </div>
   );
}

export default App;
