json.(@board, :id, :title, :user_id, :created_at, :updated_at)

unless(@lists.empty?)
	json.lists(@lists) do |list|
		json.partial! "api/boards/list", list: list

		unless(list.cards.empty?)
			json.cards(list.cards.sort_by(&:ord)) do |card|
				json.partial! "api/boards/card", card: card

				unless(card.items.empty?)
					json.items(card.items.sort_by(&:created_at)) do |item|
						json.partial! "api/boards/item", item: item
					end
				end
				
			end
		end

	end
end

