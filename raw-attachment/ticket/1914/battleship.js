/*	Original:  Kevin Peno (kevin@metalaxe.com)
	Web Site:  http://metalaxe.com

	Version: 1.0 alpha
	Date: 10/30/2007 @ 21:28 PST (-8 GMT)
	Requirements: jQuery, jQuery.ui.draggable
*/

function Battleship()
{
	/**
	*	self storage for jquery cooperation
	**/
	var self = this;

	/*
		Store ths OS window ID
	*/
	this.window = null;
	
	/*
		Dragged ship is rotated
	*/
	this.rotated = false;
	
	/*
		Store ths OS window name
	*/
	this.name = 'Battleship';
	
	/**
	*	Path to prgram
	**/
	this.program_dir = 'programs/battleship/';

	/*
	*	Game State (nothing/setup/battle)
	*/
	this.gameState = false;

	/*
		Information used to describe ships
	*/
	this.shiptypes = {
		cv : [ "Aircraft Carrier",	5,	'carrier'	],
		bb : [ "Battleship",		4,	'battleship'],
		ss : [ "Submarine",			3,	'sub'		],
		dd : [ "Destroyer",			3,	'destroyer'	],
		pt : [ "Patrol Boat",		2,	'patrol'	]
	};
	
	/**
	*	Example player object
	*
	*	this.player = {
	*					shipcall (ie. CV) :
	*						[
	*							X pos	(ie. 1)
	*							Y pos	(ie. A [numeric of] )
	*							direction	(true/false) (aka horizontal/vertical)
	*						]
	*				};
	**/

		
	/*
		Player Elements
	*/
	this.player = {};

	/*
		Computer Elements
	*/
	this.enemy = {};
	
	/*
	Start the game!
	*/
	this.Init = function( window_id, params )
	{
		this.window = window_id;

		$(".ships").draggable({
			cursorAt: {bottom:13,left: 13},
			cursor: 'move',
			start: function()
			{
				$(document).keypress(self.rotateImage);
			},
			stop: function()
			{
				$(document).unbind('keypress', self.rotateImage);
			}
		});

		$('#shipselect').show();

		$('#player table tr td:not(.non-field)').droppable({
			accept : 'img',
			tolerance: 'pointer',
			drop : this.placeShip
		});
		$('#player').show();
		
		$('#computer').bind("click", this.gridClick);

		// Change game state to setup
		this.gameState = 'setup';
	}

	/*
	*	Start the actual fighting
	*/
	this.start = function()
	{
		//Set up player zone
		this.setupPlayer( false );
		//Build the NPC
		//this.setupPlayer( true );
	}

	/*
		Function to place the ships in the grid
	*/
	this.setupPlayer = function( ispc )
	{
	}
	
	/**
	*	Place Ship on grid during setup
	*	must use 'self' for 'this' due to jquery callback
	**/
	this.placeShip = function( e, jquery_ui )
	{
		// Find our stuffs
		var target = self.findCell( e, jquery_ui );
		var direction = $('#shipselect ul:eq(0) li input:checked').val();
		var ship = $(jquery_ui.draggable.element);
		var ship_key = $(ship).attr('id');

		// If we haven't picked a ship this does nothing
		if( !ship )
		{
			return false;
		}

		// Make sure we have a proper target
		if( target == false )
		{
			alert( 'Please place the ' + self.shiptypes[ ship_key ][0] + ' to where all sides are within the ocean grid and not touching any other ships' );
			$(ship).css({ 'position' : 'relative', 'top': '0', 'left' : '0' });
			return false;
		}

		var x = self.getCellIndex( target ); // Prevents Safari returning this as 0...
		var y = $(target).parent()[0].rowIndex;

		// Get the room available
		var check_distance = direction == 'horizontal' ? ( $(target).nextAll().length + 1 ) : /*Vertical*/ ( $(target).parent().nextAll().length + 1 );

		// Check for enough room
		if( check_distance < self.shiptypes[ ship_key ][1] )
		{
			alert( 'Please place the ' + self.shiptypes[ ship_key ][0] + ' to where all sides are within the ocean grid and not touching any other ships' );
			$(ship).css({ 'position' : 'relative', 'top': '0', 'left' : '0' });
			return false;
		}
		else
		{
			// Move the ship image to the grid where selected
			$(ship).css({
				'top': $(target).offset().top,
				'left' : $(target).offset().left,
				'cursor' : 'default'
			});
			
			//Update the player node
			self.player[ ship_key ] = [ x, y, direction ];
	
			// Remove draggability
			//$(ship).draggableInstance().disable();

			//Remove droppability
			for( i=0; i < self.shiptypes[ ship_key ][1]; i++ )
			{
				$(target).droppableInstance().disable();
				target = direction == 'horizontal' ? $(target).next() : $(target).parent().next();
			}
			return true;
		}
	}

	/**
	*	Find the true targeted cell
	*	Used during ship placement
	**/
	this.findCell = function( e, jquery_ui )
	{
		var draggable = $(jquery_ui.draggable.element);
		var droppable = $(jquery_ui.draggable.currentTarget);
		var found = false;

		while( !found )
		{
			if( ( $(draggable).offset().left - $(droppable).offset().left) < 26  && ( $(draggable).offset().left - $(droppable).offset().left) > -10 )
			{
				return droppable;
			}
			else
			{
				if( ( $(draggable).offset().left - $(droppable).offset().left) > 26 )
				{
					if( $(droppable).next().is('.ui-droppable:not(.ui-droppable-disabled)') )
						droppable = $(droppable).next();
					else
						return false;
				}
				else
				{
					if( $(droppable).prev().is('.ui-droppable:not(.ui-droppable-disabled)') )
						droppable = $(droppable).prev();
					else
						return false;
				}
			}
		}
	}

	/*
	*	Handler for clicking on the grid
	*	This is called by jquery and must use "self"
	*	for this class object rather than "this"
	*/
	this.gridClick = function( e )
	{
		var target = self.getTarget( e );
		var cell = $(target);
		var x = self.getCellIndex( target ); // Prevents Safari not returning this...
		var y = cell.parent()[0].rowIndex;

		// Do attack
		if( self.gameState == 'battle' )
			self.fireShot( cell, x, y );
	}

	/**
	*	Fire a shot at the enemy!
	**/
	this.fireShot = function( cell, x, y )
	{
		return null;	
	}

	/**
	*	Function to change an image shown on a grid
	*/
	this.setImage = function( y, x, id, ispc )
	{
	}
	
	/*
		Function to make the computers move. Note that the computer does not cheat, oh no!
	*/
	this.computerMove = function()
	{
	}
	
	/*
		When whole ship is hit, show it using changed graphics
	*/
	this.sinkShip = function( grid, shipno, ispc )
	{
	}
	
	/*
		Show location of all the enemy ships - when game is over
	*/
	this.knowYourEnemy = function()
	{
	}

	/**
	*	Safari returns 0 always for cellIndex
	*	Loop to see what the index is, else return
	*	in non-borked browsers
	**/
	this.getCellIndex = function ( obj )
	{
	  var isSafari = (navigator.userAgent.indexOf("Safari") != -1 );
	  var ci = ( isSafari && obj.cellIndex == 0 ? -1 : obj.cellIndex );
	
	  for ( var x = 0; ci == -1 && x < obj.parentElement.cells.length; x++ )
	  {
		if ( obj === obj.parentElement.cells[x] ) {
		  ci = x;
		}
	  }
	  return ci;
	}

	/**
	*	gets a valid grid target
	**/
	this.getTarget = function( e )
	{
		var target;
		//W3C
		if (e.target) target = e.target;
		//MS
		else if (e.srcElement) target = e.srcElement;

		// defeat Safari bug
		if (target.nodeType == 3)
		{
			target = target.parentNode;
		}

		return target;
	}

	/**
	*	Used to change a ship from horizontal to vertical
	*	during drag operation
	*	must use 'self' instead of 'this'
	**/
	this.rotateImage = function( e )
	{
		console.log('keydown');
		console.log( e.which );
		return e;	
	}
}