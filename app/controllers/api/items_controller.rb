module Api
  class ItemsController < ApiController
  	
  	def create
      @item = current_card.items.new(item_params)

      if @item.save
        render json: @item
      else
        render json: @item.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @item = Item.find(params[:id])
      @item.destroy();
      render json: @item
    end

    private

    def current_card
      if params[:id]
        @item = Item.find(params[:id])
        @card = @item.card
      elsif params[:item]
        @card = Card.find(params[:item][:card_id])
      end
    end

    def current_list 
    	current_card.list
    end

    def current_board
      current_list.board
    end

    def item_params
      params.require(:item).permit(:title, :card_id )
    end
  end
end
