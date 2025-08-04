import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // ⚡ import fusionné
import emailjs from "@emailjs/browser";
import "../../styles/App.css";
import "../../styles/CheckoutForm.css";

import { clearCart } from "../../lib/actions"; 

const CheckoutForm = () => {
  const dispatch = useDispatch(); // ⚡ hook Redux
  const items = useSelector((state) => state.items);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construire le contenu du panier sous forme de tableau HTML
    const panierHTML = `
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width:100%; font-family: Arial, sans-serif; font-size:14px;">
        <thead style="background:#f5f5f5;">
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix Unitaire</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${items
            .map(
              (item) => `
            <tr>
              <td>${item.details.name}</td>
              <td style="text-align:center;">${item.quantity}</td>
              <td style="text-align:center;">€${item.details.price.toFixed(2)}</td>
              <td style="text-align:center;">€${(
                item.quantity * item.details.price
              ).toFixed(2)}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;

    const total = items
      .reduce((sum, item) => sum + item.quantity * item.details.price, 0)
      .toFixed(2);

    const templateParams = {
      nom: formData.nom,
      prenom: formData.prenom,
      adresse: formData.adresse,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      panier: panierHTML,
      total: total
    };

    emailjs
      .send(
        "service_t1gokun",
        "template_0pvcjig",
        templateParams,
        "XlA7t255wLMFdXwOV"
      )
      .then(
        () => {
          alert("✅ Votre commande a été envoyée à l’administrateur !");
          
          setFormData({
            nom: "",
            prenom: "",
            adresse: "",
            phone: "",
            email: "",
            message: ""
          });

          dispatch(clearCart()); // ⚡ Vide le panier après envoi
        },
        (error) => {
          alert("❌ Erreur lors de l’envoi, réessayez.");
          console.error(error.text);
        }
      );
  };

  return (
    <div className="container checkout-container">
      <h2>Finaliser votre commande</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label>Nom :</label>
          <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Prénom :</label>
          <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Adresse :</label>
          <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Téléphone :</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email :</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Message :</label>
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Votre message pour l’administrateur..." />
        </div>

        <button type="submit" className="btn btn-primary">
          Envoyer ma commande
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
