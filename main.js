// variables globales
let cart = [];
let currentQuizStep = 0;
let quizAnswers = [];

// data des produits
const products = [
  {
    id: 1,
    name: 'Sérum Éclat Naturel',
    price: 42,
    description:
      'Un sérum concentré aux extraits de plantes pour améliorer votre teint et réduire les imperfections.',
    ingredients:
      'Acide hyaluronique, Vitamine C, Extrait de rose musquée, Aloe vera',
    category: 'serum',
  },
  {
    id: 2,
    name: 'Crème Hydratante Douce',
    price: 38,
    description:
      'Une crème onctueuse qui nourrit intensément votre peau tout en respectant son équilibre naturel.',
    ingredients: "Beurre de karité, Huile d'argan, Céramides, Eau de rose",
    category: 'creme',
  },
  {
    id: 3,
    name: 'Nettoyant Purifiant',
    price: 28,
    description:
      'Un gel nettoyant doux qui élimine les impuretés sans dessécher votre peau.',
    ingredients:
      'Argile verte, Huile de tea tree, Extrait de camomille, Glycérine végétale',
    category: 'nettoyant',
  },
  {
    id: 4,
    name: 'Masque Régénérant',
    price: 35,
    description:
      'Un masque nourrissant qui redonne éclat et vitalité à votre peau.',
    ingredients:
      "Miel de manuka, Huile d'avocat, Extrait de spiruline, Vitamine E",
    category: 'masque',
  },
  {
    id: 5,
    name: 'Huile Précieuse Nuit',
    price: 48,
    description:
      'Une huile sèche qui nourrit votre peau pendant la nuit pour un réveil lumineux.',
    ingredients: 'Huile de jojoba, Huile de rose, Squalane, Vitamine A',
    category: 'huile',
  },
  {
    id: 6,
    name: 'Contour des Yeux',
    price: 45,
    description: 'Un soin ciblé qui atténue les cernes et ridules.',
    ingredients: 'Peptides, Caféine, Acide hyaluronique, Extrait de concombre',
    category: 'contour',
  },
];

// Quiz questions
const quizQuestions = [
  {
    question: 'Comment votre peau réagit-elle au réveil ?',
    answers: [
      { text: 'Elle est douce et confortable', score: 2 },
      { text: 'Elle tire un peu', score: 1 },
      { text: 'Elle est brillante sur la zone T', score: 3 },
      { text: 'Elle est très sèche et inconfortable', score: 0 },
      { text: 'Elle est rouge et irritée', score: 4 },
    ],
  },
  {
    question: 'Après avoir nettoyé votre visage, que ressentez-vous ?',
    answers: [
      { text: 'Une sensation de fraîcheur', score: 2 },
      { text: 'Un léger tiraillement', score: 1 },
      { text: "Le besoin d'appliquer rapidement une crème", score: 0 },
      { text: 'Une sensation de propreté équilibrée', score: 2 },
      { text: 'Des rougeurs ou des irritations', score: 4 },
    ],
  },
  {
    question: 'En milieu de journée, votre peau est :',
    answers: [
      { text: 'Confortable et mate', score: 2 },
      { text: 'Légèrement brillante sur le nez', score: 1 },
      { text: 'Brillante sur toute la zone T', score: 3 },
      { text: 'Sèche et terne', score: 0 },
      { text: 'Réactive avec des rougeurs', score: 4 },
    ],
  },
  {
    question: 'Comment votre peau réagit-elle aux nouveaux produits ?',
    answers: [
      { text: 'Elle les tolère bien généralement', score: 2 },
      { text: 'Elle peut parfois réagir', score: 1 },
      { text: "Elle s'adapte rapidement", score: 3 },
      { text: "Elle a besoin de temps pour s'habituer", score: 0 },
      { text: 'Elle réagit souvent mal', score: 4 },
    ],
  },
];

document.addEventListener('DOMContentLoaded', function () {
  loadProducts();
  setupScrollAnimations();
  updateCartDisplay();

  document
    .querySelector('.mobile-menu')
    .addEventListener('click', toggleMobileMenu);

  document.querySelectorAll('.nav-menu a').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelector('.nav-menu').classList.remove('mobile-open');
      document.querySelector('.mobile-menu').classList.remove('active');
    });
  });
});

// Navigation
function showPage(pageId) {
  // Cacher les pages
  document.querySelectorAll('.page').forEach((page) => {
    page.classList.remove('active');
  });

  // Afficher les pages selectionnées
  document.getElementById(pageId).classList.add('active');

  // Scroller en haut
  window.scrollTo(0, 0);
}

// Charger les produits
function loadProducts() {
  const productsGrid = document.getElementById('productsGrid');
  productsGrid.innerHTML = '';

  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
                    <div class="product-image"></div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-price">${product.price}€</p>
                        <button class="product-button" onclick="openProductModal(${product.id})">
                            Découvrir
                        </button>
                    </div>
                `;
    productsGrid.appendChild(productCard);
  });
}

// Product modal
function openProductModal(productId) {
  const product = products.find((p) => p.id === productId);
  const modal = document.getElementById('productModal');
  const modalContent = document.getElementById('modalContent');

  modalContent.innerHTML = `
                <div class="product-image" style="height: 200px; margin-bottom: 1rem;"></div>
                <h2>${product.name}</h2>
                <p style="color: var(--accent); font-size: 1.2rem; font-weight: 600; margin: 1rem 0;">${product.price}€</p>
                <p style="margin: 1rem 0; line-height: 1.6;">${product.description}</p>
                <h4 style="margin-top: 2rem; margin-bottom: 0.5rem;">Ingrédients clés :</h4>
                <p style="color: var(--text-light); font-size: 0.9rem;">${product.ingredients}</p>
                <button class="cta-button" onclick="addToCart(${product.id})" style="margin-top: 2rem; width: 100%;">
                    Ajouter au panier
                </button>
                <div style="margin-top: 2rem; padding: 1rem; background: var(--cream); border-radius: 10px;">
                    <h4 style="margin-bottom: 0.5rem;">Avis clients ⭐⭐⭐⭐⭐</h4>
                    <p style="font-style: italic; color: var(--text-light);">"Un produit exceptionnel qui a changé ma routine beauté !"</p>
                    <p style="font-size: 0.8rem; color: var(--text-light); margin-top: 0.5rem;">- Rose m.</p>
                </div>
            `;

  modal.style.display = 'block';
}

function closeModal() {
  document.getElementById('productModal').style.display = 'none';
}

// Fonctionnalités panier
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  updateCartDisplay();
  closeModal();

  // Produit ajouté
  showNotification('Produit ajouté au panier !');
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartDisplay();
}

function updateQuantity(productId, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity = newQuantity;
    updateCartDisplay();
  }
}

function updateCartDisplay() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const totalAmount = document.getElementById('totalAmount');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Update panier
  cartCount.textContent = totalItems;
  cartCount.classList.toggle('show', totalItems > 0);

  // Update produits dans le panier
  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p style="text-align: center; color: var(--text-light); padding: 2rem;">Votre panier est vide</p>';
    cartTotal.style.display = 'none';
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
                    <div class="cart-item">
                        <div class="cart-item-image"></div>
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">${item.price}€</div>
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="updateQuantity(${
                                  item.id
                                }, ${item.quantity - 1})">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-btn" onclick="updateQuantity(${
                                  item.id
                                }, ${item.quantity + 1})">+</button>
                                <button class="quantity-btn" onclick="removeFromCart(${
                                  item.id
                                })" style="margin-left: 1rem; background: #ff6b6b; color: white;">×</button>
                            </div>
                        </div>
                    </div>
                `
      )
      .join('');

    cartTotal.style.display = 'block';
    totalAmount.textContent = totalPrice + '€';
  }
}

function toggleCart() {
  const cartPanel = document.getElementById('cartPanel');
  cartPanel.classList.toggle('open');
}

function checkout() {
  if (cart.length === 0) return;

  showNotification('Commande confirmée ! Merci pour votre achat 🌟');
  cart = [];
  updateCartDisplay();
  toggleCart();
}

// Fonctionnalités quiz
function startQuiz() {
  currentQuizStep = 0;
  quizAnswers = [];
  showQuizQuestion();
}

function showQuizQuestion() {
  // Cacher bouton démarrer
  document.getElementById('quizStart').classList.remove('active');

  // Supprimer les questions
  document
    .querySelectorAll('.quiz-question:not(#quizStart)')
    .forEach((q) => q.remove());

  if (currentQuizStep < quizQuestions.length) {
    const question = quizQuestions[currentQuizStep];
    const questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question active';
    questionDiv.innerHTML = `
                    <h3>Question ${currentQuizStep + 1}/${
      quizQuestions.length
    }</h3>
                    <p>${question.question}</p>
                    <div class="quiz-answers">
                        ${question.answers
                          .map(
                            (answer, index) => `
                            <button class="quiz-answer" onclick="selectAnswer(${answer.score})">
                                ${answer.text}
                            </button>
                        `
                          )
                          .join('')}
                    </div>
                `;
    document.querySelector('.quiz-container').appendChild(questionDiv);
  } else {
    showQuizResult();
  }
}

function selectAnswer(score) {
  quizAnswers.push(score);
  currentQuizStep++;

  setTimeout(() => {
    document.querySelector('.quiz-question.active').classList.remove('active');
    showQuizQuestion();
  }, 300);
}

function showQuizResult() {
  const totalScore = quizAnswers.reduce((sum, score) => sum + score, 0);
  const averageScore = totalScore / quizAnswers.length;

  let skinType, recommendation, productId;

  if (averageScore <= 0.5) {
    skinType = 'Peau Très Sèche';
    recommendation =
      "Votre peau a peut-être besoin d'hydratation intense.Essayez notre Crème Hydratante Douce.";
    productId = 2;
  } else if (averageScore <= 1.5) {
    skinType = 'Peau Sèche';
    recommendation =
      "Votre peau manque peut-être d'hydratation. Essayez notre Sérum Éclat Naturel.";
    productId = 1;
  } else if (averageScore <= 2.5) {
    skinType = 'Peau Normale';
    recommendation =
      'Votre peau est peut-être équilibrée ! Maintenez cette harmonie avec notre Nettoyant Purifiant.';
    productId = 3;
  } else if (averageScore <= 3.5) {
    skinType = 'Peau Mixte à Grasse';
    recommendation =
      "Votre peau a peut-être besoin d'équilibre. Essayez notre Masque Régénérant.";
    productId = 4;
  } else {
    skinType = 'Peau Sensible';
    recommendation =
      'Votre peau nécessite peut-être des soins doux. Essayez notre Huile Précieuse Nuit.';
    productId = 5;
  }

  const resultDiv = document.getElementById('quizResult');
  const resultContent = document.getElementById('resultContent');

  resultContent.innerHTML = `
                <div style="text-align: center; padding: 2rem; background: var(--cream); border-radius: 15px; margin: 2rem 0;">
                    <h4 style="color: var(--accent); margin-bottom: 1rem;">Votre type de peau :</h4>
                    <h3 style="font-family: 'Lora', serif; margin-bottom: 1rem;">${skinType}</h3>
                    <p style="margin-bottom: 2rem;">${recommendation}</p>
                    <div class="product-image" style="width: 100px; height: 100px; margin: 0 auto 1rem; border-radius: 50%;"></div>
                    <button class="cta-button" onclick="openProductModal(${productId})">
                        Voir le produit recommandé
                    </button>
                </div>
                <div style="text-align: center;">
                    <button class="quiz-answer" onclick="restartQuiz()">
                        Refaire le test
                    </button>
                </div>
            `;

  resultDiv.classList.add('show');
}

function restartQuiz() {
  document.getElementById('quizResult').classList.remove('show');
  document.getElementById('quizStart').classList.add('active');
  currentQuizStep = 0;
  quizAnswers = [];
}

// Fonctionnalités faq
function toggleFAQ(button) {
  const answer = button.nextElementSibling;
  const icon = button.querySelector('span');

  if (answer.classList.contains('open')) {
    answer.classList.remove('open');
    icon.textContent = '+';
  } else {
    // Fermer les autre faq
    document
      .querySelectorAll('.faq-answer')
      .forEach((ans) => ans.classList.remove('open'));
    document
      .querySelectorAll('.faq-question span')
      .forEach((ic) => (ic.textContent = '+'));

    answer.classList.add('open');
    icon.textContent = '-';
  }
}

// Valider formulaire
function handleSubmit(event) {
  event.preventDefault();
  showNotification(
    'Message envoyé ! Nous vous répondrons dans les plus brefs délais.'
  );
  event.target.reset();
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--accent);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                z-index: 3000;
                animation: slideIn 0.3s ease;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Animations au scroll
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach((el) => {
    observer.observe(el);
  });
}

// Ferme le produit quand click ailleurs
document.getElementById('productModal').addEventListener('click', function (e) {
  if (e.target === this) {
    closeModal();
  }
});

// Ferme le panier quand clique ailleurs
document.addEventListener('click', function (e) {
  const cartPanel = document.getElementById('cartPanel');
  const cartIcon = document.querySelector('.cart-icon');

  if (
    !cartPanel.contains(e.target) &&
    !cartIcon.contains(e.target) &&
    cartPanel.classList.contains('open')
  ) {
    toggleCart();
  }
});

// Animations css pour les notifications
const style = document.createElement('style');
style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
document.head.appendChild(style);

function toggleMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const mobileMenu = document.querySelector('.mobile-menu');

  navMenu.classList.toggle('mobile-open');
  mobileMenu.classList.toggle('active');
}
