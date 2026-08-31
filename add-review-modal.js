(function() {
  const styles = `
    /* Floating Button */
    .glb-floating-btn-review {
      position: fixed;
      bottom: 30px;
      left: 30px;
      z-index: 9998;
      background: linear-gradient(135deg, #111, #333);
      color: #eaeaea;
      padding: 16px 28px;
      border-radius: 30px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 0.5px;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.1);
      transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .glb-floating-btn-review:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2);
      background: linear-gradient(135deg, #222, #444);
      color: #fff;
    }

    @media (max-width: 600px) {
      .glb-floating-btn-review {
        bottom: 90px;
      }
    }

    /* Modal Overlay */
    .glb-modal-overlay-review {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.4s ease, visibility 0.4s ease;
    }

    .glb-modal-overlay-review.active {
      opacity: 1;
      visibility: visible;
    }

    /* Modal Content Box */
    .glb-modal-content-review {
      background: linear-gradient(180deg, #1e1e1e 0%, #0f0f0f 100%) !important;
      border: 1px solid rgba(200, 200, 200, 0.15);
      border-radius: 24px;
      width: 90%;
      max-width: 500px;
      padding: 40px;
      color: #f0f0f0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      box-shadow: 0 20px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1);
      transform: translateY(30px) scale(0.95);
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    .glb-modal-overlay-review.active .glb-modal-content-review {
      transform: translateY(0) scale(1);
    }

    /* Close Button */
    .glb-modal-close-review {
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      color: #fff !important;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.2s ease;
    }
    .glb-modal-close-review:hover {
      background: rgba(255,255,255,0.15);
      color: #fff;
    }

    .glb-modal-review-title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
      background: none !important;
      -webkit-background-clip: unset !important;
      -webkit-text-fill-color: #ffffff !important;
      color: #ffffff !important;
    }
    
    .glb-modal-review-subtitle {
      font-size: 15px;
      color: #ffffff !important;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 24px;
    }

    .glb-star-rating {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      direction: rtl;
      justify-content: flex-end;
    }
    
    .glb-star-rating input {
      display: none;
    }
    
    .glb-star-rating label {
      font-size: 24px;
      color: #444;
      cursor: pointer;
      transition: color 0.2s ease;
    }
    
    .glb-star-rating label:hover,
    .glb-star-rating label:hover ~ label,
    .glb-star-rating input:checked ~ label {
      color: #e20001;
    }

    .glb-form-group {
      margin-bottom: 16px;
    }

    .glb-form-group input, .glb-form-group textarea {
      width: 100%;
      padding: 14px 16px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      color: #fff;
      font-family: inherit;
      font-size: 15px;
      outline: none;
      transition: border-color 0.2s ease;
      box-sizing: border-box;
    }

    .glb-form-group input:focus, .glb-form-group textarea:focus {
      border-color: rgba(255,255,255,0.4);
    }
    
    .glb-modal-review-btn {
      display: block;
      width: 100%;
      text-align: center;
      background: #fff;
      color: #000;
      padding: 14px 24px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      border: none;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .glb-modal-review-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(255,255,255,0.1);
    }
    
    .glb-success-msg {
      display: none;
      text-align: center;
      padding: 20px 0;
    }
    
    .glb-success-msg.active {
      display: block;
      animation: fadeIn 0.5s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  const modalHTML = `
    <!-- Modal Overlay -->
    <div class="glb-modal-overlay-review" id="glbOverlayReview">
      <div class="glb-modal-content-review">
        <div class="glb-modal-close-review" id="glbCloseReview">✕</div>
        
        <div id="glbReviewFormContainer">
            <div class="glb-modal-review-subtitle">Feedback</div>
            <div class="glb-modal-review-title">Write a Review</div>
            <div style="color: #ffffff !important; margin-bottom: 24px; font-size: 15px;">Tell us about your experience working with Global Logic Media.</div>
            
            <form id="glbReviewForm">
              <div class="glb-star-rating" style="display:flex; flex-direction:row-reverse; justify-content:flex-end;">
                <input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="5 stars">★</label>
                <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="4 stars">★</label>
                <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="3 stars">★</label>
                <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="2 stars">★</label>
                <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="1 star">★</label>
              </div>
              <div class="glb-form-group">
                <input type="text" placeholder="Your Name" required>
              </div>
              <div class="glb-form-group">
                <textarea placeholder="Write your review here..." rows="4" required></textarea>
              </div>
              <button type="submit" class="glb-modal-review-btn">Submit Review</button>
            </form>
        </div>
        
        <div id="glbReviewSuccess" class="glb-success-msg">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:16px;">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div class="glb-modal-review-title">Thank You!</div>
            <div style="color: #ffffff !important; font-size: 15px;">Your review has been submitted successfully and is pending approval.</div>
        </div>
      </div>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = modalHTML;
  document.body.appendChild(wrapper);

  const overlay = document.getElementById('glbOverlayReview');
  const closeBtn = document.getElementById('glbCloseReview');
  const form = document.getElementById('glbReviewForm');
  const formContainer = document.getElementById('glbReviewFormContainer');
  const successMsg = document.getElementById('glbReviewSuccess');

  function openModal() {
    overlay.classList.add('active');
    formContainer.style.display = 'block';
    successMsg.classList.remove('active');
    form.reset();
  }

  function closeModal() {
    overlay.classList.remove('active');
  }

  // Use event delegation for dynamically injected trigger review button
  document.addEventListener('click', (e) => {
    if (e.target && e.target.closest('#glbTriggerReview')) {
      openModal();
    }
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Automatically trigger modal open if URL hash matches #review or #leave-a-review
  function checkReviewHash() {
    if (window.location.hash === '#review' || window.location.hash === '#leave-a-review') {
      openModal();
    }
  }
  window.addEventListener('load', checkReviewHash);
  window.addEventListener('hashchange', checkReviewHash);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    checkReviewHash();
  }
  
  form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;

      try {
        const name = form.querySelector('input[type="text"]').value;
        const text = form.querySelector('textarea').value;
        const ratingInput = form.querySelector('input[name="rating"]:checked');
        const rating = ratingInput ? parseInt(ratingInput.value) : 5;
        
        const newReview = { author: name, text: text, rating: rating, status: 'pending', createdAt: firebase.database.ServerValue.TIMESTAMP };
        
        if (window.firebaseDB) {
          const addPromise = window.firebaseDB.ref("reviews").push(newReview);
          const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout: Database connection failed. Please ensure you clicked 'Create Database' in Firebase Realtime Database.")), 8000));
          await Promise.race([addPromise, timeoutPromise]);
        } else {
          // Fallback to localStorage if Firebase fails to load
          let storedReviews = JSON.parse(localStorage.getItem('glb_reviews')) || [];
          storedReviews.unshift(newReview);
          localStorage.setItem('glb_reviews', JSON.stringify(storedReviews));
        }

        formContainer.style.display = 'none';
        successMsg.innerHTML = '<p style="color:#4ade80; text-align:center; margin-bottom:15px; font-weight:600;">Your review has been submitted and is pending approval by the admin.</p>';
        successMsg.classList.add('active');
        
        // Hide modal after 3 seconds
        setTimeout(() => {
            document.getElementById('glbOverlayReview').classList.remove('active');
        }, 3000);
      } catch (error) {
        console.error("Error adding document: ", error);
        const errorDiv = document.createElement('div');
        errorDiv.id = 'glbReviewErrorMsg';
        errorDiv.style.color = '#f87171';
        errorDiv.style.marginTop = '10px';
        errorDiv.style.textAlign = 'center';
        errorDiv.style.fontSize = '14px';
        errorDiv.textContent = "Error: " + error.message;
        
        const existing = form.querySelector('#glbReviewErrorMsg');
        if (existing) existing.remove();
        form.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
  });
})();
