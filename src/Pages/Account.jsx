import ActiveLastBreadcrumb from "../components/common/components/Link";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import { auth, firestore } from "../Auth/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { useState, useEffect } from "react";
import i18n from "../components/common/components/LangConfig";

const Account = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (!user) {
        console.warn("User is not logged in.");
        setLoading(false);
        return navigate("/login");
      }

      try {
        const userId = user.uid;
        const userDocRef = doc(firestore, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setFirstName(userData.firstName || "");
          setLastName(userData.lastName || "");
          setEmail(userData.email || "");
          setAddress(userData.address || "");
        } else {
          console.log("User document not found");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSaveChanges = async () => {
    try {
      await setDoc(doc(firestore, "users", auth.currentUser.uid), {
        firstName,
        lastName,
        email,
        address,
      });
      setMessage(i18n.t("accountPage.setMassage"));
      setOpen(true);
    } catch (error) {
      setError(error.message);
      setOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="mt-48 text-center text-lg text-gray-600">
        Loading your account...
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-4 md:ml-36 mt-48 gap-20 justify-center md:justify-between">
      <div className="flex flex-col md:flex-row gap-28">
        <nav className="flex flex-col gap-4 text-gray-400">
          <h1 className="text-black text-sm md:text-base font-medium">
            {i18n.t("accountPage.manageMyAccount")}
          </h1>
          <ul>
            <li className="px-4 py-2">
              <Link to="/Profile" className="hover:underline">
                {i18n.t("accountPage.myProfile")}
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link to="/addressBoo" className="hover:underline">
                {i18n.t("accountPage.addressBook")}
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link to="/PaymentOptions" className="hover:underline">
                {i18n.t("accountPage.myPaymentOptions")}
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link to="/Orders" className="hover:underline">
                {i18n.t("accountPage.myOrders")}
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link to="/Returns" className="hover:underline">
                {i18n.t("accountPage.myReturns")}
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link to="/Cancelations" className="hover:underline">
                {i18n.t("accountPage.myCancelations")}
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link to="/wishlist" className="hover:underline">
                {i18n.t("accountPage.myWishlist")}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="shadow w-full flex flex-col py-10 md:px-20 px-5 rounded">
          <div className="flex flex-col gap-6 md:w-[710px]">
            <span className="text-xl font-medium text-red-600">
              {i18n.t("accountPage.editYourProfile")}
            </span>

            <div className="flex flex-col md:flex-row gap-6 md:gap-[50px] justify-between">
              <div className="flex flex-col gap-2 w-full">
                <span className="text-sm md:text-base">
                  {i18n.t("accountPage.firstName")}
                </span>
                <input
                  type="text"
                  placeholder="Your first name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="rounded bg-gray-100 px-4 py-3 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span className="text-sm md:text-base">Last Name</span>
                <input
                  type="text"
                  placeholder="Your last name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="rounded bg-gray-100 px-4 py-3 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-[50px] justify-between">
              <div className="flex flex-col gap-2 w-full">
                <span className="text-sm md:text-base">
                  {i18n.t("accountPage.email")}
                </span>
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded bg-gray-100 px-4 py-3 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span className="text-sm md:text-base">
                  {i18n.t("accountPage.address")}
                </span>
                <input
                  type="text"
                  placeholder="Your address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="rounded bg-gray-100 px-4 py-3 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <span className="text-sm md:text-base">
                {i18n.t("accountPage.passwordChanges")}
              </span>
              <input
                type="password"
                placeholder={i18n.t("accountPage.currentPassword")}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="rounded bg-gray-100 px-4 py-3 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300"
              />
              <input
                type="password"
                placeholder={i18n.t("accountPage.newPassword")}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="rounded bg-gray-100 px-4 py-3 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300"
              />
              <input
                type="password"
                placeholder={i18n.t("accountPage.confirmPassword")}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded bg-gray-100 px-4 py-3 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300"
              />
            </div>

            <div className="ml-auto flex items-center gap-8 text-sm md:text-base">
              <button
                onClick={() => {
                  setFirstName("");
                  setLastName("");
                  setEmail("");
                  setAddress("");
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                className="hover:underline underline-offset-4 duration-300 transform hover:-translate-y-1"
              >
                {i18n.t("accountPage.cancel")}
              </button>
              <button
                onClick={handleSaveChanges}
                className="text-sm md:text-lg bg-red-600 text-white px-6 md:px-12 py-3 rounded hover:bg-red-500 transition-transform duration-100 transform hover:translate-y-[-4px] focus:translate-y-0"
              >
                {i18n.t("accountPage.saveChanges")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error ? error : message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Account;
