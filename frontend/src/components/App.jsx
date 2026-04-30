import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

import api from "../utils/api";
import { login, register, checkToken } from "../utils/auth";

import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  // TOOLTIP STATES
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // TOKEN CHECK
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      checkToken(token)
        .then((res) => {
          setEmail(res.email);
          setCurrentUser(res);
          setLoggedIn(true);
          navigate("/");
        })
        .catch(() => {
          localStorage.removeItem("jwt");
        });
    }
  }, [navigate]);

  // DATA ONLY WHEN LOGGED IN
  useEffect(() => {
    if (!loggedIn) return;

    api.getUserInfo().then(setCurrentUser).catch(console.error);

    api.getInitialCards().then(setCards).catch(console.error);
  }, [loggedIn]);

  // LOGIN
  const handleLogin = (email, password) => {
    login(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        setEmail(email);
        navigate("/");
      })
      .catch(() => {
        alert("Login failed. Check email/password");
      });
  };

  // REGISTER (CON TOOLTIP CORRECTO)
  const handleRegister = (email, password) => {
    register(email, password)
      .then(() => {
        setIsSuccess(true);
        setInfoTooltip(true);

        // esperar un poquito para que se vea el popup
        setTimeout(() => {
          setInfoTooltip(false);
          navigate("/signin");
        }, 1500);
      })
      .catch(() => {
        setIsSuccess(false);
        setInfoTooltip(true);
      });
  };

  const closeTooltip = () => setInfoTooltip(false);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
    navigate("/signin");
  };

  // POPUPS
  const handleOpenPopup = (popupData) => setPopup(popupData);
  const handleClosePopup = () => setPopup(null);

  // USER UPDATE
  const handleUpdateUser = (data) => {
    api
      .updateUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch(console.error);
  };

  // AVATAR UPDATE
  const handleUpdateAvatar = (data) => {
    api
      .updateUserAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch(console.error);
  };

  // LIKE
  const handleCardLike = async (card) => {
    const isLiked = card.likes?.some((like) => {
      const likeId = typeof like === "string" ? like : like._id;
      return likeId === currentUser._id;
    });

    try {
      const newCard = isLiked
        ? await api.unlikeCard(card._id)
        : await api.likeCard(card._id);

      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE
  const handleCardDelete = async (card) => {
    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (err) {
      console.error(err);
    }
  };

  // ADD CARD
  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data)
      .then((newCard) => {
        setCards((prev) => [newCard, ...prev]);
        handleClosePopup();
      })
      .catch(console.error);
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
      }}
    >
      <div className="page">
        <Header email={email} loggedIn={loggedIn} onLogout={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                  <Main
                    cards={cards}
                    popup={popup}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />

          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />

          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>

        {/* TOOLTIP */}
        <InfoTooltip
          isOpen={infoTooltip}
          isSuccess={isSuccess}
          onClose={closeTooltip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
