Pile = function(bottom, right)
{
	this.bottom = bottom; this.right = right;
	this.cards = new Array();
	this.animated = false;
}

Pile.prototype.setCenter = function(bottom, right)
{
	this.bottom = bottom; this.right = right;
}

Pile.prototype.setCards = function(cards)
{
	this.cards = cards;
	this.length = this.cards.length;
}

Pile.prototype.orderCards = function()
{
	for(var i = 0; i < this.cards.length; i++)
	{
		this.cards[i].setPlace(i);
	}
}

Pile.prototype.addCard = function(card)
{
	this.cards.push(card);
	this.length = this.cards.length;
}

Pile.prototype.addCards = function(pile)
{
	this.cards = this.cards.concat(pile);
}

Pile.prototype.getSomeCards = function(amount)
{
	amount = amount?amount:parseInt(Math.random()*3);
	return this.cards.splice(this.cards.length-amount-1, amount);
}

Pile.prototype.getCards = function()
{
	return this.cards;
}

Pile.prototype.hasCards = function()
{
	return this.cards.length;
}

Pile.prototype.split = function(splitAt)
{
	splitAt = splitAt?splitAt:this.cards.length/2+parseInt(Math.random()*10)-5;
	
	
	var splitPiles = [new Pile(), new Pile()];
	len = this.cards.length - splitAt;
	
	splitPiles[1].setCards(this.cards.splice(splitAt, len));
	splitPiles[0].setCards(this.cards.splice(0, splitAt));
	return splitPiles;
}

Pile.prototype.riffleTogether = function(pile1, pile2)
{
	while(pile1.hasCards() && pile2.hasCards())
	{
		this.addCards(pile1.getSomeCards());
		this.addCards(pile2.getSomeCards());
		this.animate();
	}
	
	if(pile1.hasCards())
	{
		this.addCards(pile1.getCards());
		this.animate();
	}
	if(pile2.hasCards())
	{
		this.addCards(pile2.getCards());
		this.animate();
	}
	this.orderCards();
	console.log(this.cards.length)
}

Pile.prototype.join = function(piles)
{
	this.cards.addCards(piles[0]);
	this.cards.addCards(piles[1]);
	this.orderCards();
}

Pile.prototype.animate = function()
{
	this.animated = false;
	this.cardsMoved = 0;
	
	cardMoved = $.proxy(this, 'cardsMoved');
	
	for(var i = 0; i < this.cards.length; i++)
	{
		$(this.cards[i]).bind(
			'cardMoved',
			$.proxy(this, 'cardsMoved')
		);
		this.cards[i].moveTo(this.bottom-parseInt(i/7), this.right-parseInt(i/7));
	}
}

Pile.prototype.cardsMoved = function()
{
	this.cardsMoved++;
	if(this.cardsMoved == this.cards.length)
	{
		$(this).trigger('pileMoved')
	}
}

Pile.prototype.draw = function(div)
{
	for(var i = 0 ; i < this.cards.length; i++)
	{
		this.cards[i].draw(div, this.bottom-parseInt(i/7), this.right-parseInt(i/7));
	}
}

Pile.prototype.toXML = function()
{
	xml = '';
	for(var i = 0; i < this.cards.length; i++)
	{
		xml += this.cards[i].toXML();
	}
	return xml;
}