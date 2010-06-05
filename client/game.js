Game = {
  // Init game and connect server
  init: function() {
    this._comet = new Faye.Client('/comet');
    this._comet.subscribe('/event', this.accept, this);
    this.initGui();
  },

  // Init GUI
  initGui: function() {
    var self = this;
    this._log = $('#log');
    $('#ping').bind( 'click', function() { self.send('ping') } );
  },

  // Log message
  log: function(msg) {
    this._log.append( msg );
    this._log.attr({ scrollTop: this._log.attr("scrollHeight") } ); 
  },
   
  // Send message to game server
  send: function(message) {
    this.log( "-> " + message + "\n" );
    this._comet.publish('/action', message);
  },
  
  // Handler for messages received over subscribed channels.
  accept: function(message) {
    this.log( "<- " + message + "\n" );
  }
};

