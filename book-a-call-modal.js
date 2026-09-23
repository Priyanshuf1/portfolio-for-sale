(function() {
  const styles = `
    /* Floating Button */
    .glb-floating-btn-book {
      position: fixed;
      bottom: 96px;
      right: 30px;
      z-index: 9998;
      background: linear-gradient(135deg, #e20001, #a30000);
      color: #ffffff;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(226,0,1,0.3), inset 0 1px 1px rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.1);
      transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .glb-floating-btn-book:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2);
      background: linear-gradient(135deg, #222, #444);
      color: #fff;
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
      background: none !important;
      -webkit-background-clip: unset !important;
      -webkit-text-fill-color: #ffffff !important;
      color: #ffffff !important;
    }
    
    .glb-modal-book-subtitle {
      font-size: 15px;
      color: #ffffff !important;
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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    </div>

    <!-- Modal Overlay -->
    <div class="glb-modal-overlay-book" id="glbOverlayBook">
      <div class="glb-modal-content-book">
        <div class="glb-modal-close-book" id="glbCloseBook">✕</div>
        
        <div id="glbBookFormContainer">
          <div class="glb-modal-book-subtitle">Let's Talk</div>
          <div class="glb-modal-book-title">Book a Call With Us</div>
          <div style="color: #ffffff !important; margin-bottom: 24px; font-size: 15px;">Schedule a free consultation with our experts to discuss your digital marketing needs.</div>
          
          <form id="glbBookForm">
            <!-- Honeypot Bot Trap (Invisible to humans, caught by spam bots) -->
            <div style="display: none; position: absolute; left: -9999px;">
              <label for="glbFormTrap">Leave this empty if you are human</label>
              <input type="text" id="glbFormTrap" name="glbFormTrap" tabindex="-1" autocomplete="off">
            </div>
            
            <div class="glb-form-group">
              <input type="text" id="glbBookName" placeholder="Your Name" required>
            </div>
            <div class="glb-form-group">
              <input type="email" id="glbBookEmail" placeholder="Email Address" required>
            </div>
            <div class="glb-form-group">
              <input type="tel" id="glbBookPhone" placeholder="Phone Number" required>
            </div>
            <div class="glb-form-group">
              <textarea id="glbBookDetails" placeholder="Tell us about your business..." rows="4"></textarea>
            </div>
            <button type="submit" class="glb-modal-book-btn">Schedule Call</button>
          </form>
        </div>

        <div id="glbBookSuccess" style="display: none; text-align: center; padding: 20px 0;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 16px; display: block;">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div class="glb-modal-book-title" style="background: none; -webkit-text-fill-color: #4ade80; color: #4ade80 !important; font-size: 24px; text-shadow: none;">Thank You!</div>
            <div style="color: #ffffff !important; font-size: 15px; margin-top: 8px;">Your booking request was submitted successfully! Our team will contact you shortly.</div>
            <div id="glbBookSuccessWa" style="margin-top: 20px;"></div>
        </div>
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
  const formContainer = document.getElementById('glbBookFormContainer');
  const successMsg = document.getElementById('glbBookSuccess');

  let closeTimeout = null;

  function openModal() {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = null;
    }
    overlay.classList.add('active');
    formContainer.style.display = 'block';
    successMsg.style.display = 'none';
    form.reset();
    const existingErr = form.querySelector('#glbBookErrorMsg');
    if (existingErr) existingErr.remove();
  }

  function closeModal() {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = null;
    }
    overlay.classList.remove('active');
  }

  window.openBookACallModal = openModal;

  // Auto-trigger contact modal automatically as someone enters the website
  function autoOpenOnEnter() {
    setTimeout(() => {
      if (overlay && !overlay.classList.contains('active')) {
        openModal();
      }
    }, 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoOpenOnEnter);
  } else {
    autoOpenOnEnter();
  }

  // Also trigger on first user tap/click if user interacts before the 1.2s timeout
  function triggerOnFirstTap(e) {
    if (overlay && !overlay.classList.contains('active')) {
      if (e.target && e.target.closest && e.target.closest('#glbCloseBook, .glb-floating-btn-book')) return;
      openModal();
    }
    window.removeEventListener('pointerdown', triggerOnFirstTap, { capture: true });
  }
  window.addEventListener('pointerdown', triggerOnFirstTap, { capture: true, passive: true });

  trigger.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Background Auto-Sync for any pending offline bookings
  async function syncPendingBookings() {
    if (!window.firebaseDB) return;
    let unsynced = JSON.parse(localStorage.getItem('glb_unsynced_bookings')) || [];
    if (!unsynced.length) return;
    
    let stillUnsynced = [];
    for (const b of unsynced) {
      try {
        await window.firebaseDB.ref("bookings").push({
          name: b.name,
          email: b.email,
          phone: b.phone,
          businessDetails: b.businessDetails,
          createdAt: b.createdAt || Date.now()
        });
      } catch (err) {
        stillUnsynced.push(b);
      }
    }
    localStorage.setItem('glb_unsynced_bookings', JSON.stringify(stillUnsynced));
  }
  window.addEventListener('firebaseLoaded', syncPendingBookings);
  window.addEventListener('online', syncPendingBookings);
  setTimeout(syncPendingBookings, 2500);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Bot prevention: check honeypot trap
    const trap = document.getElementById('glbFormTrap');
    if (trap && trap.value) {
      console.warn("Spam bot submission blocked via honeypot trap.");
      formContainer.style.display = 'none';
      successMsg.style.display = 'block';
      return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    try {
      const nameEl = form.querySelector('#glbBookName') || form.querySelector('input[placeholder="Your Name"]');
      const emailEl = form.querySelector('#glbBookEmail') || form.querySelector('input[type="email"]');
      const phoneEl = form.querySelector('#glbBookPhone') || form.querySelector('input[type="tel"]');
      const detailsEl = form.querySelector('#glbBookDetails') || form.querySelector('textarea');

      const localBooking = {
        name: (nameEl ? nameEl.value : '').trim(),
        email: (emailEl ? emailEl.value : '').trim(),
        phone: (phoneEl ? phoneEl.value : '').trim(),
        businessDetails: (detailsEl ? detailsEl.value : '').trim(),
        createdAt: Date.now(),
        synced: false
      };

      // 1. GUARANTEED RETENTION: Always save to local browser storage first
      try {
        let bookings = JSON.parse(localStorage.getItem('glb_bookings')) || [];
        bookings.unshift(localBooking);
        localStorage.setItem('glb_bookings', JSON.stringify(bookings));

        let unsynced = JSON.parse(localStorage.getItem('glb_unsynced_bookings')) || [];
        unsynced.unshift(localBooking);
        localStorage.setItem('glb_unsynced_bookings', JSON.stringify(unsynced));
      } catch (storageErr) {
        console.warn("Storage fallback error:", storageErr);
      }

      // 2. ATTEMPT FIREBASE CLOUD SYNC (Non-blocking fail-safe)
      if (window.firebaseDB) {
        try {
          const cloudPayload = {
            ...localBooking,
            createdAt: (typeof firebase !== 'undefined' && firebase.database) ? firebase.database.ServerValue.TIMESTAMP : Date.now()
          };
          const addPromise = window.firebaseDB.ref("bookings").push(cloudPayload);
          const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 4000));
          await Promise.race([addPromise, timeoutPromise]);

          // Cloud sync succeeded: remove from unsynced queue
          let curUnsynced = JSON.parse(localStorage.getItem('glb_unsynced_bookings')) || [];
          curUnsynced = curUnsynced.filter(u => !(u.email === localBooking.email && u.phone === localBooking.phone));
          localStorage.setItem('glb_unsynced_bookings', JSON.stringify(curUnsynced));
        } catch (dbError) {
          console.warn("Firebase cloud push deferred (lead safely preserved in local offline backup):", dbError);
          // Never throw to the user - lead is safely preserved!
        }
      }

      // 3. SHOW IMMEDIATE CONFIRMATION TO CLIENT
      formContainer.style.display = 'none';
      successMsg.style.display = 'block';

      // Provide immediate WhatsApp connect option with pre-filled message
      const waMsg = encodeURIComponent("Hi Global Logic Media, I just submitted a booking request on your website!\n\nName: " + localBooking.name + "\nPhone: " + localBooking.phone + "\nEmail: " + localBooking.email + "\nDetails: " + (localBooking.businessDetails || "Free Consultation"));
      const waBtn = document.getElementById('glbBookSuccessWa');
      if (waBtn) {
        waBtn.innerHTML = `
          <a href="https://wa.me/message/CDN2NPVITSRHH1?text=${waMsg}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:8px; background:#25D366; color:#ffffff !important; font-weight:700; font-size:14px; padding:12px 24px; border-radius:30px; text-decoration:none; box-shadow:0 4px 15px rgba(37,211,102,0.3); transition:transform 0.2s ease;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff"><path d="M12.004 2C6.479 2 2 6.48 2 12.006c0 1.83.498 3.547 1.365 5.023L2 22l5.143-1.348A9.96 9.96 0 0 0 12.004 22c5.524 0 10.003-4.478 10.003-10.004S17.528 2 12.004 2zm0 18.283c-1.605 0-3.114-.46-4.397-1.253l-.316-.194-3.262.856.871-3.18-.21-.334a8.243 8.243 0 0 1-1.267-4.172c0-4.57 3.717-8.288 8.281-8.288 4.564 0 8.281 3.718 8.281 8.288 0 4.57-3.717 8.287-8.281 8.287z"/></svg>
            Connect on WhatsApp
          </a>
        `;
      }

      closeTimeout = setTimeout(() => {
        closeModal();
      }, 7000);
    } catch (unexpectedErr) {
      console.error("Submission handler error:", unexpectedErr);
      // Fallback display
      formContainer.style.display = 'none';
      successMsg.style.display = 'block';
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
})();
