class MyGameServer < RailsGame::Server

  # Define new function names for new actions
  def action_think(player, objects)
    player.send_html("You think '#{h objects}'. <br />")
  end

  def action_hex_selected(player, objects)
    player.send_html("Received hex_select with objects #{objects.inspect}. <br />")
  end

  def action_init_hexgrid_container(player, objects)
    # Player not logged in yet.  How to fix?
    player.send_html("Received init_hexgrid_container with objects #{objects.inspect}. <br />")
  end

  def unknown_action(player, verb, objects)
    player.send_html("I don't know the verb '#{h verb}'.  Sorry! <br />")
  end
end
