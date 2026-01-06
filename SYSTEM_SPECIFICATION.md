# BETTING FLASH – COMPLETE VIRTUAL GAMES, CASINO & ADMIN CONTROL LOGIC
## Product Owner System Specification

---

## 1. Core Philosophy of Betting Flash

Betting Flash is **not** an automated betting platform.

It is a **fully admin-controlled betting system** where:
- Users place bets
- All outcomes are manually decided by the admin
- Wallet balances **never** change automatically
- Every bet, game, and transaction must be visible and controllable from the admin dashboard
- **Nothing happens in the system unless the admin approves or settles it.**

---

## 2. Current Problems That Must Be Fixed

The following issues are **unacceptable** and must be corrected:

- ❌ Admin dashboard can only update balance
- ❌ Users are not visible
- ❌ Open bets are blank
- ❌ Casino games do not work
- ❌ Virtual games do not exist
- ❌ Booking codes cannot be viewed or managed
- ❌ Bets taken by users do not appear in admin
- ❌ Odds selection UI breaks layout
- ❌ Transaction history is static and fake
- ❌ No control over win/loss outcomes
- ❌ No admin control over game results
- ❌ No way to manage up to 500 games on homepage

This document defines the correct system behavior.

---

## 3. Users & Admin Visibility (MANDATORY)

Admin Dashboard MUST include:

### Full User List
**Search capabilities:**
- Name
- Email
- Phone
- User ID

### For Each User, Admin Must See:
- Wallet balance
- Open bets (count & details)
- Settled bets (count & details)
- Casino plays (count & details)
- Booking codes used
- Transaction history
- Last login
- Account status

**Rule: Admin must see everything a user does.**

---

## 4. Betting Slip & Open Bets Logic

### When a User Places a Bet:

The bet MUST immediately appear in:
- **Admin → Open Bets** (searchable, sortable)

### Data Shown for Each Bet:
- User (name + ID)
- Bet type (Sports / Virtual / Casino)
- Selections (all picks listed)
- Odds (individual + combined)
- Stake (amount wagered)
- Potential win (calculated)
- Timestamp (when placed)
- Booking code (if any)
- Status badge (🟡 PENDING)

### Critical Rule:
**No bet is auto-settled. Ever.**

---

## 5. Manual Bet Settlement Logic (CRITICAL)

### Admin Must Be Able To:

Click any open bet and choose:
- ✅ **WIN**
- ❌ **LOSE**
- ⏸ **VOID** (optional)

### If WIN:
Admin chooses:
- Full payout (stake × odds)
- Partial payout (custom percentage)
- Custom payout amount (absolute value)
- **Wallet is updated ONLY after admin confirms**

### If LOSE:
- Stake is removed from wallet
- **No automatic deductions** - admin explicitly marks loss
- User wallet decreases only on confirmation

### If VOID:
- Bet marked as void
- Optional reason stored
- Refund policy: admin decides (full/partial/none)

### Ultimate Rule:
**Nothing is automatic. Admin is absolute.**

---

## 6. Virtual Games System (MAJOR MISSING FEATURE)

### Virtual Games MUST EXIST

Virtual games are **admin-generated games**, not simulated AI games.

### How Virtual Games Work:

#### Admin Creates Virtual Match:
Admin inputs:
- Team A name (typed by admin)
- Team B name (typed by admin)
- League (Virtual League)
- Match time (scheduled)
- Status (Scheduled / Live / Finished)

#### System Auto-Generates Betting Markets:
- **1X2** (Home Win / Draw / Away Win)
- **Over/Under** (total goals threshold)
- **Correct Score** (exact final score)
- **Both Teams To Score** (BTTS)

#### Admin Sets Market Details:
- Odds for each market option
- Correct outcome (hidden from users until settlement)

#### User Side:
- User places bet normally (like real sports)
- Bet appears in Open Bets
- User waits for match to "finish"

#### Admin Side:
- Admin later settles the result **manually**
- Admin decides who wins or loses
- Admin chooses payout amount
- **There is NO random engine. Only admin control.**

#### Match Lifecycle:
1. Admin creates → Match appears on homepage
2. Users place bets → Bets appear in Open Bets
3. Match time arrives → Admin can mark "Live"
4. Admin settles → Winner/loser determined
5. Payouts processed → User wallets updated

---

## 7. Casino Games Logic (CURRENTLY BROKEN)

Casino games must be **admin-controlled outcome games**, not real RNG games.

### Casino Games Include:
- Dice (1-6 outcome)
- Crash (multiplier game)
- Roulette (number/color)
- Slot (symbols)
- Spin Wheel (numbered wheel)

### How Casino Games MUST Work:

#### User Plays Game:
1. User selects game
2. User enters stake
3. Stake is locked (deducted from wallet immediately)
4. User plays (UI interaction)

#### Play Appears Instantly in Admin:
- **Admin → Casino Plays** section
- Shows: User, Game Type, Stake, Timestamp
- Status: 🟡 PENDING SETTLEMENT

#### Admin Decides Outcome:
1. Admin clicks the play
2. Admin chooses: WIN or LOSE
3. If WIN: Admin sets payout amount
4. If LOSE: Stake is already taken, no action needed
5. Admin confirms

#### Wallet Updates:
- Only when admin confirms
- If WIN: Add payout to wallet
- If LOSE: Stake already removed, no further change

### Critical Rule:
**Casino games are UI interactions, not real games.**
The system shows a game UI, but admin controls the result.

---

## 8. Booking Code System (MISSING ENTIRELY)

### Booking Code Logic:

#### Every Bet Can Generate a Booking Code:
- When user places a bet, option to "Generate Booking Code"
- System generates unique code (e.g., `BF-A7K9X-M2Q4`)
- Code stored in bet record

#### Admin Can:
- Search booking code
- See original selections
- See original user
- See reuse history (if code shared/reused)
- View all bets created with that code

#### When Another User Enters a Booking Code:
1. User enters code in "My Bets → Load Code" section
2. System validates code exists
3. Selections auto-load into betslip
4. User can modify stake or accept
5. New bet created separately
6. **Original bet and new bet appear separately in Open Bets**
7. Admin can settle each independently

#### Use Case Example:
- User A places bet on 1X2 at odds 1.5 / 2.0 / 3.5
- User A generates booking code: `BF-ABC123`
- User A shares code with User B
- User B enters code → Same 1X2 options load
- User B places their own bet at same odds
- Both bets appear in Open Bets
- Admin settles each user's bet independently

---

## 9. Homepage Games Volume (SCALABILITY)

### Homepage Must Support Up to 500 Games

Games can be:
- Real sports (admin imported/updated)
- Virtual games (admin created)

### Odds Panel Must:
- Collapse selections properly when multiple picks made
- Never stretch UI (responsive scrolling)
- Use scrollable betslip container
- Show combined odds clearly
- Show potential win calculation
- Mobile-responsive

### Performance Requirements:
- Load 500 games without lag
- Search/filter by league or game type
- Sort by odds, time, or popularity
- Lazy-load on scroll

---

## 10. Admin Dashboard Structure (REQUIRED SECTIONS)

Admin dashboard MUST have these sections:

1. **Dashboard** (Overview)
   - Total users
   - Total open bets
   - Total settled bets
   - Revenue/losses chart
   - Recent activity feed

2. **Users Management**
   - User list (search, sort)
   - Click user → See all their data
   - Edit user details
   - Manual wallet adjustment
   - View user's bet history

3. **Open Bets**
   - All unsettled bets
   - Sortable by user, type, stake, time
   - Click bet → Settlement panel
   - Mark WIN / LOSE / VOID
   - Set custom payout

4. **Settled Bets**
   - Historical record
   - Filter by date range
   - Filter by user
   - View settlement details

5. **Virtual Games Manager**
   - Create new virtual match
   - Edit match details
   - Set odds for markets
   - Mark match as Live/Finished
   - View users' bets on each match
   - Settle match results

6. **Casino Games Manager**
   - View all active casino plays
   - Settle plays (WIN/LOSE)
   - Set payouts
   - View casino play history

7. **Booking Codes**
   - Search by code
   - View original bet
   - View reuse history
   - View all bets created from code

8. **Wallet Controls**
   - Manual balance adjustment
   - Adjustment reason/note
   - Transaction log

9. **Transaction Logs**
   - All wallet changes (deposits, withdrawals, bets, wins, adjustments)
   - Filterable by type, user, date
   - Search by user or transaction ID

10. **Game Creation Panel**
    - Import real sports events
    - Create virtual matches
    - Bulk import games
    - Schedule games

11. **Admin Activity Logs**
    - Who did what, when
    - Settlement history
    - User adjustments
    - Game changes

**Anything less is incomplete.**

---

## 11. Transaction History (REAL, NOT STATIC)

### Every Transaction Must Be Logged:

- Deposits (user funded wallet)
- Withdrawals (user withdrew money)
- Bet stakes (user placed bet)
- Bet winnings (user won)
- Bet losses (user lost - optional to log)
- Manual adjustments (admin changed balance)
- Refunds (void refunds)

### Admin Must See:
- Who changed what
- When (timestamp)
- Why (reason/note)
- Amount
- Before/after balance
- Status (completed/pending)

### Transaction History Must Be:
- **Real data, not placeholder text**
- Searchable by user
- Filterable by type
- Sortable by date
- Exportable (CSV)

---

## 12. Final Rule (MOST IMPORTANT)

### Betting Flash is an admin-controlled betting platform.

- **Users never determine outcomes.**
- **Games do not resolve themselves.**
- **Wallets never update automatically.**
- **If any system behaves automatically, it is wrong.**

---

## 13. Expected Outcome After Fix

After implementing this logic:
- ✅ Virtual games exist
- ✅ Casino games work properly
- ✅ Admin controls everything
- ✅ Open bets show correctly
- ✅ Booking codes are usable
- ✅ Users are visible with full history
- ✅ Dashboard becomes powerful and professional
- ✅ Transaction history is real and auditable

---

## 14. User Bet Settlement Feedback & History Display (MANDATORY)

### Every Time Admin Settles a Bet:

The system must immediately update the user experience in three places:
1. **Bet History** (updates status)
2. **Wallet History** (adds transaction)
3. **Settlement Result Page** (shows outcome)

**Nothing should settle silently.**

---

## 15. Bet History Status Logic

### Each Bet in User's Bet History Must Show Exactly One Status:

- 🟢 **WON** (admin marked win)
- 🔴 **LOST** (admin marked loss)
- ⚪ **VOIDED** (admin marked void)
- 🟡 **PENDING** (waiting for admin settlement)

### For Every Bet, Show:
- Bet ID
- Selections (all picks)
- Odds (combined)
- Stake (amount wagered)
- Potential Win (if pending)
- Final Result (if settled)
- Amount Won/Lost (if settled)
- Date & Time Placed
- Date & Time Settled

---

## 16. Settlement Result Pages (USER-FACING)

### A. WIN PAGE (CONGRATULATIONS)

When admin marks a bet as **WIN**:

User must see a dedicated page/modal with:

**Title:**
```
🎉 Congratulations!
```

**Message:**
```
Your game has been settled successfully.
You won this bet.
```

**Details Displayed:**
- Stake (original amount wagered)
- Total Odds (combined odds)
- Amount Won (profit)
- Updated Wallet Balance (new balance)

**CTA Button:**
```
➡️ Bet Again
```

**Important:** This page must look like a real betting app win confirmation, not a pop-up alert.

---

### B. LOSS PAGE (TRY AGAIN)

When admin marks a bet as **LOSE**:

**Title:**
```
❌ Better Luck Next Time
```

**Message:**
```
Your game has been settled.
Unfortunately, this bet did not win.
```

**Details Displayed:**
- Stake (amount lost)
- Odds
- Outcome: Lost
- Updated Wallet Balance (after loss)

**CTA Button:**
```
➡️ Try Again
```

**Rule:** No wallet increase. Stake was already deducted.

---

### C. VOID PAGE (VOIDED)

When admin marks a bet as **VOID**:

**Title:**
```
⚪ Bet Voided
```

**Message:**
```
This game has been voided by the admin.
```

**Details Displayed:**
- Stake (original amount)
- Reason (if provided by admin)
- Refunded Amount (if any)
- Updated Wallet Balance (if refunded)

**Rule:** Wallet update happens only if admin approves refund.

---

## 17. Wallet & Transaction History Update

### After Settlement:

#### If WIN:
- Add winning amount to wallet
- Log transaction:
  - Type: `Bet Win`
  - Reference: Bet ID
  - Amount: Winnings
  - Date: Settlement date
  - Status: Completed

#### If LOSE:
- Log transaction:
  - Type: `Bet Loss`
  - Amount: Stake lost
  - Reference: Bet ID
  - Date: Settlement date
  - Status: Completed
- Wallet already reduced (at bet placement)

#### If VOID:
- Log transaction:
  - Type: `Bet Voided`
  - Reference: Bet ID
  - Refund Amount: (if any)
  - Date: Settlement date
  - Reason: (optional)
  - Status: Completed
- Wallet updated only if refund approved

**Rule:** Transaction history must be real data, not placeholder text.

---

## 18. Admin ↔ User Sync Rule

### The Moment Admin Settles a Bet:

1. **User's open bet disappears** from their "Open Bets" list
2. **Bet history updates** with new status (WON/LOST/VOID)
3. **Settlement page becomes available** (for user to view)
4. **Wallet updates** (only if admin allowed payout/refund)
5. **Transaction is logged** in both user and admin history

**Rule:** No delays. No refresh hacks. No fake loading.

---

## 19. Final User Experience Rule

### Every Settled Bet Must Tell the User What Happened.

- **Win** = Celebrate 🎉
- **Loss** = Encourage 💪
- **Void** = Explain 📋

**Silence equals a broken betting platform.**

---

## 20. Summary of Sections to Rebuild

### Backend Changes Required:
1. **User Model** - Add fields for complete user tracking
2. **Bet Model** - Add settlement status, booking codes, history
3. **Casino Play Model** - Track admin-controlled outcomes
4. **Virtual Game Model** - Admin-created matches with markets
5. **Transaction Model** - Real transaction logging
6. **Booking Code Model** - Shareable bet codes
7. **Settlement Routes** - Admin bet settlement API
8. **User Visibility Routes** - Admin user search and details API

### Frontend (User App) Changes Required:
1. **Bet History Page** - Show WON/LOST/VOID/PENDING status
2. **Settlement Result Pages** - Win/Loss/Void confirmation modals
3. **Transaction History** - Real transaction display
4. **Booking Code Input** - Load shared bets feature
5. **Casino Games** - UI for games (outcome controlled by admin)
6. **Virtual Games** - Display admin-created matches

### Admin Dashboard Changes Required:
1. **Users Section** - Full user list with search
2. **Open Bets Section** - Manage and settle bets
3. **Virtual Games Manager** - Create and manage matches
4. **Casino Games Manager** - Manage casino plays
5. **Settlement Interface** - WIN/LOSE/VOID with payout control
6. **Transaction Logs** - Real transaction history
7. **Booking Codes Section** - Search and manage codes
8. **Dashboard Overview** - KPIs and analytics

---

## Next Steps

This specification is ready to hand to any developer or AI system for reconstruction.

**Do not proceed with development until:**
- All sections are understood
- Architecture is designed
- Database models are created
- API endpoints are defined

This ensures Betting Flash is built correctly from the ground up.

---

**Document Version:** 1.0  
**Created:** January 6, 2026  
**Status:** Ready for Implementation
