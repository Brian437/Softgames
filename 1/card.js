class Card 
{
	constructor()
	{
		this._name="";
		this._imageURL='';
		this._next=null;
		this._prev=null;
		this._posX=0;
		this._posY=0;
		this._speedX=0;
		this._speedY=0;

	}
	get name()
	{
		return this._name;
	}
	set name(value)
	{
		this._name=value;
	}
	get imageURL()
	{
		return this._imageURL;
	}
	set imageURL(value)
	{
		this._imageURL=value;
	}
	get next()
	{
		return this._next;
	}
	set next(value)
	{
		if(!(value instanceof Card))
		{
			throw("Invalid data");
		}
		if(this._next!=null)
		{
			this._next._prev=null;
		}
		this._next=value;
		value._prev=this;
	}
	get prev()
	{
		return this._prev;
	}
	get posX()
	{
		return this._posX;
	}
	set posX(value)
	{
		if(isNaN(value))
		{
			throw "Invalid data: posX must be a number";
		}
		this._posX=value;
	}
	get posY()
	{
		return this._posY;
	}
	set posY(value)
	{
		if(isNaN(value))
		{
			throw "Invalid data: posY must be a number";
		}
		this._posY=value;
	}
	get speedX()
	{
		return this._speedX;
	}
	set speedX(value)
	{
		if(isNaN(value))
		{
			throw "Invalid data: speedX must be a number";
		}
		this._speedX=value;
	}
	get speedY()
	{
		return this._speedY;
	}
	set speedY(value)
	{
		if(isNaN(value))
		{
			throw "Invalid data: speedY must be a number";
		}
		this._speedY=value;
	}
	move()
	{
		this.posX+=this.speedX;
		this.posY+=this.speedY;
	}
	
}