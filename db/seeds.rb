User.create!([
  {email: "guest@guest.com", password: 'password', password_digest: "$2a$10$eRVFSzk9vugSsbC3rtchVOA9COjT6wLwFq8fI9Egr1h5WufcNYTNG", session_token: "_vb08uGwXcs-4eyYRNICCQ"}
])

Board.create!([
  {title: "Welcome Board - Click Here!", user_id: 1}
])

