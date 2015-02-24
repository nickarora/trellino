# == Schema Information
#
# Table name: boards
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  user_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class Board < ActiveRecord::Base
  validates :title, :user, presence: true

  belongs_to :user
  has_many :lists, dependent: :destroy
  has_many :board_memberships, dependent: :destroy
  has_many :members, through: :board_memberships, source: :user

  def self.reseed
  	Board.where.not(id: 1).destroy_all
  	List.destroy_all

  	list1 = Board.first.lists.create!({title: "Basics", ord: 0.0})
  	list2 = Board.first.lists.create!({title: "Intermediate", ord: 1.0})
  	list3 = Board.first.lists.create!({title: "Advanced", ord: 2.0})

  	card1 = list1.cards.create!({title: "Welcome to Trellino!", description: "", ord: 0.0})
  	card2 = list1.cards.create!({title: "This is a card.", description: "", ord: 1.0})
  	card3 = list1.cards.create!({title: "Click on a card to see what's behind it.", description: "Every card has a unique description.  Add important details about your card and keep things organized!", ord: 2.0})
  	card4 = list1.cards.create!({title: "Each card has a unique description.", description: "Every card has a unique description.  Add important details about your card and keep things organized!", ord: 3.0})
  	card5 = list1.cards.create!({title: "And a built in checklist (with progress bar)!", description: "Every card has a unique description.  Add important details about your card and keep things organized!", ord: 4.0})

  	card6 = list2.cards.create!({title: "Try dragging cards anywhere!", description: "", ord: 0.0})
  	card7 = list2.cards.create!({title: "Try dragging lists anywhere!", description: "", ord: 1.0})
  	card8 = list2.cards.create!({title: "Make as many cards and lists as you need.", description: "", ord: 2.0})

  	card9 = list3.cards.create!({title: "Edit Card Titles after they've been created by clicking on the pen icon", description: "", ord: 0.0})
  	card10 = list3.cards.create!({title: "Edit card descriptions and update their associated checklists by clicking once on the card title, then changing the card's contents.", description: "Every card has a unique description.  Add important details about your card and keep things organized!", ord: 1.0})
  	card11 = list3.cards.create!({title: "Have fun!", description: "Thanks for using my app!", ord: 2.0})
  	
  	card1.items.create!([
  		{title: "Do pushups", done: false},
		  {title: "Do Situps", done: false},
		  {title: "Eat donut", done: true}
  	])

  	card2.items.create!([
  		{title: "Jog one mile", done: false},
		  {title: "Eat one pizza", done: true}
  	])

  	card3.items.create!([
  		{title: "You can create checklist items!", done: false},
		  {title: "Make as many as you want.", done: false},
		  {title: "Check them off when done.", done: true},
		  {title: "the progress bar tells you how much more to go.", done: false}
  	])

  	card4.items.create!([
  		{title: "the red X allows you to delete checklist items", done: false},
		  {title: "be careful before you click it", done: false}
  	])

  	card5.items.create!([
  		{title: "Buy milk", done: false},
		  {title: "Call Step-sister", done: false},
		  {title: "Email Team", done: true},
  	])
  end

  def is_member?(u)
    return true if u.id == self.user_id
    board_memberships.where(user_id: u.id).exists?
  end

end
