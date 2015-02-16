# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list

json.(@board, :id, :title, :user_id, :created_at, :updated_at)

unless(@lists.empty?)
	json.lists(@lists) do |list|
		json.partial! "api/boards/list", list: list

		unless(list.cards.empty?)
			json.cards(list.cards.sort_by(&:ord)) do |card|
				json.partial! "api/boards/card", card: card
			end
		end

	end
end

