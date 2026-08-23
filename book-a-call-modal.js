(function() {
  const styles = `
    /* Floating Button */
    .glb-floating-btn-book {
      position: fixed;
      bottom: 30px;
      right: 170px;
      z-index: 9998;
      background: linear-gradient(135deg, #111, #333);
      color: #eaeaea;
      padding: 14px 24px;
      border-radius: 30px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.5px;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.1);
      transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .glb-floating-btn-book:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2);
      background: linear-gradient(135deg, #222, #444);
      color: #fff;
    }

    @media (max-width: 600px) {
      .glb-floating-btn-book {
        right: 30px;
        bottom: 90px;
      }
    }

    /* Modal Overlay */
    .glb-modal-overlay-book {
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

    .glb-modal-overlay-book.active {
      opacity: 1;
      visibility: visible;
    }

    /* Modal Content Box */
    .glb-modal-content-book {
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

    .glb-modal-overlay-book.active .glb-modal-content-book {
      transform: translateY(0) scale(1);
    }

    /* Close Button */
    .glb-modal-close-book {
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      color: #aaa;
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
    .glb-modal-close-book:hover {
      background: rgba(255,255,255,0.15);
      color: #fff;
    }

    /* Form inside Modal */
    .glb-modal-book-title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
      background: linear-gradient(90deg, #fff, #aaa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .glb-modal-book-subtitle {
      font-size: 15px;
      color: #888;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 24px;
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
    
    .glb-modal-book-btn {
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
    
    .glb-modal-book-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(255,255,255,0.1);
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  const modalHTML = `
    <!-- Floating Trigger -->
    <div class="glb-floating-btn-book" id="glbTriggerBook">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
      Book a Call
    </div>

    <!-- Modal Overlay -->
    <div class="glb-modal-overlay-book" id="glbOverlayBook">
      <div class="glb-modal-content-book">
        <div class="glb-modal-close-book" id="glbCloseBook">✕</div>
        
        <div class="glb-modal-book-subtitle">Let's Talk</div>
        <div class="glb-modal-book-title">Book a Call With Us</div>
        <div style="color: #999; margin-bottom: 24px; font-size: 15px;">Schedule a free consultation with our experts to discuss your digital marketing needs.</div>
        
        <form id="glbBookForm" onsubmit="event.preventDefault(); alert('Request submitted! We will contact you shortly.'); document.getElementById('glbCloseBook').click();">
          <div class="glb-form-group">
            <input type="text" placeholder="Your Name" required>
          </div>
          <div class="glb-form-group">
            <input type="email" placeholder="Email Address" required>
          </div>
          <div class="glb-form-group">
            <input type="tel" placeholder="Phone Number" required>
          </div>
          <div class="glb-form-group">
            <textarea placeholder="Tell us about your business..." rows="4"></textarea>
          </div>
          <button type="submit" class="glb-modal-book-btn">Schedule Call</button>
        </form>
      </div>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = modalHTML;
  document.body.appendChild(wrapper);

  const trigger = document.getElementById('glbTriggerBook');
  const overlay = document.getElementById('glbOverlayBook');
  const closeBtn = document.getElementById('glbCloseBook');
  const form = document.getElementById('glbBookForm');

  function openModal() {
    overlay.classList.add('active');
  }

  function closeModal() {
    overlay.classList.remove('active');
  }

  trigger.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    try {
      const formData = {
        name: form.querySelector('input[type="text"]').value,
        email: form.querySelector('input[type="email"]').value,
        phone: form.querySelector('input[type="tel"]').value,
        businessDetails: form.querySelector('textarea').value,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      };

      if (window.firebaseDB) {
        const addPromise = window.firebaseDB.ref("bookings").push(formData);
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout: Database connection failed. Please ensure you clicked 'Create Database' in Firebase Realtime Database.")), 8000));
        await Promise.race([addPromise, timeoutPromise]);
      } else {
        console.error("Firebase not loaded");
      }

      formContainer.style.display = 'none';
      successMsg.style.display = 'block';
      setTimeout(() => {
          closeModal();
      }, 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Database Error: " + error.message);
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
})();
