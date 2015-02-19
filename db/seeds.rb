User.create!([
  {email: "guest@guest.com", password: 'password', password_digest: "$2a$10$eRVFSzk9vugSsbC3rtchVOA9COjT6wLwFq8fI9Egr1h5WufcNYTNG", session_token: "_vb08uGwXcs-4eyYRNICCQ"}
])
Board.create!([
  {title: "Welcome Board - Click Here!", user_id: 1}
])
List.create!([
  {title: "Basics", board_id: 1, ord: 0.0},
  {title: "Intermediate", board_id: 1, ord: 1.0},
  {title: "Advanced", board_id: 1, ord: 2.0}
])
Card.create!([
  {title: "Try dragging cards anywhere!", list_id: 2, description: "", ord: 0.0},
  {title: "Edit Card Titles after they've been created by clicking on the pen icon", list_id: 3, description: "", ord: 0.0},
  {title: "Welcome to Trellino!", list_id: 1, description: "", ord: 0.0},
  {title: "This is a card.", list_id: 1, description: "", ord: 1.0},
  {title: "Edit card descriptions and update their associated checklists by clicking once on the card title, then changing the card's contents.", list_id: 3, description: "Every card has a unique description.  Add important details about your card and keep things organized!", ord: 1.0},
  {title: "Try dragging lists anywhere!", list_id: 2, description: "", ord: 1.0},
  {title: "Click on a card to see what's behind it.", list_id: 1, description: "Every card has a unique description.  Add important details about your card and keep things organized!", ord: 2.0},
  {title: "Make as many cards and lists as you need.", list_id: 2, description: "", ord: 2.0},
  {title: "Have fun!", list_id: 3, description: "Thanks for using my app!", ord: 2.0},
  {title: "Each card has a unique description.", list_id: 1, description: "Every card has a unique description.  Add important details about your card and keep things organized!", ord: 3.0},
  {title: "And a built in checklist (with progress bar)!", list_id: 1, description: "Every card has a unique description.  Add important details about your card and keep things organized!", ord: 4.0}
])
Item.create!([
  {title: "You can create checklist items!", card_id: 7, done: false},
  {title: "Make as many as you want.", card_id: 7, done: false},
  {title: "Check them off when done.", card_id: 7, done: true},
  {title: "the progress bar tells you how much more to go.", card_id: 7, done: false},
  {title: "the red X allows you to delete checklist items", card_id: 10, done: false},
  {title: "be careful before you click it", card_id: 10, done: false},
  {title: "Buy milk", card_id: 11, done: false},
  {title: "Call Step-sister", card_id: 11, done: false},
  {title: "Email Team", card_id: 11, done: true},
  {title: "Do pushups", card_id: 3, done: false},
  {title: "Do Situps", card_id: 3, done: false},
  {title: "Eat donut", card_id: 3, done: true},
  {title: "Jog one mile", card_id: 4, done: false},
  {title: "Eat one pizza", card_id: 4, done: true}
])


