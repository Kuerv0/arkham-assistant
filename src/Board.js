import React from 'react';

export function Inventory( {ctx, G, moves} ) {
  const handleDiscardCommon = (name) => moves.discardCard(name, "commonItems")
  const handleDiscardUnique = (name) => moves.discardCard(name, "uniqueItems")
  const handleDiscardSpell = (name) => moves.discardCard(name, "spells")
  const handleDiscardSkill = (name) => moves.discardCard(name, "skills")

  const handleDrawCommon = () => moves.drawCard("commonItems")
  const handleDrawUnique = () => moves.drawCard("uniqueItems")
  const handleDrawSpell = () => moves.drawCard("spells")
  const handleDrawSkill = () => moves.drawCard("skills")

  return(
    <div className="ui grid">
      <Menu
        drawCommon={handleDrawCommon}
        drawUnique={handleDrawUnique}
        drawSpell={handleDrawSpell}
        drawSkill={handleDrawSkill}
      />
      <AllCards
        dataCommon={G.players[ctx["currentPlayer"]]["commonItems"]}
        discardCommon={handleDiscardCommon}
        dataUnique={G.players[ctx["currentPlayer"]]["uniqueItems"]}
        discardUnique={handleDiscardUnique}
        dataSpell={G.players[ctx["currentPlayer"]]["spells"]}
        discardSpell={handleDiscardSpell}
        dataSkill={G.players[ctx["currentPlayer"]]["skills"]}
        discardSkill={handleDiscardSkill}
      />
      <MythosList
        dataEnv={G["mythosEnv"]}
        dataRum={G["mythosRum"]}
        dataLast={G["mythosLast"]}
      />
      <Gate
        title={"Gate"}
        data={G["gateLast"]}
      />
    </div>
  )
}

// Common Items
function CommonItemList(props){
  return(
    props.data.map((card) =>
      <CommonItem
        name={card.name}
        type={card.type}
        description={card.description}
        hands={card.hands}
        price={card.price}
        discard={props.discard}
      />
    )
  )
}

function CommonItem(props){
  return(
    <div className="ui card">
      <div className="image">
      </div>
      <div className="content">
        <span className="right floated">
          <i className="newspaper icon"></i>
        </span>
        <a className="header">{props.name}</a>
        <div className="meta">
          <span className="date">{props.type}</span>
        </div>
        <div className="description" dangerouslySetInnerHTML={{__html: props.description}}>
        </div>
      </div>
      <div className="extra content">
        <span className="right floated">
          <i className="hand paper icon"></i>
          {props.hands}
        </span>
        <i className="dollar sign icon"></i>
        {props.price}
      </div>
      <button className="ui brown button" onClick={() => props.discard(props.name)}>
        Discard
      </button>
    </div>
  )
}

// Unique Items

function UniqueItemList(props){
  return(
    props.data.map((card) =>
      <UniqueItem
        name={card.name}
        type={card.type}
        description={card.description}
        hands={card.hands}
        price={card.price}
        discard={props.discard}
      />
    )
  )
}

function UniqueItem(props){
  return(
    <div className="ui card">
      <div className="image">
      </div>
      <div className="content">
        <span className="right floated">
          <i className="star icon"></i>
        </span>
        <a className="header">{props.name}</a>
        <div className="meta">
          <span className="date">{props.type}</span>
        </div>
        <div className="description" dangerouslySetInnerHTML={{__html: props.description}}></div>
      </div>
      <div className="extra content">
        <span className="right floated">
          <i className="hand paper icon"></i>
          {props.hands}
        </span>
        <i className="dollar sign icon"></i>
        {props.price}
      </div>
      <button className="ui purple button" onClick={() => props.discard(props.name)}>
        Discard
      </button>
    </div>
  )
}

// Spells

function SpellList(props){
  return(
    props.data.map((card) =>
      <Spell
        name={card.name}
        casting={card["Casting Modifier"]}
        sanity={card["Sanity Cost"]}
        description={card.description}
        discard={props.discard}
      />
    )
  )
}

function Spell(props){
  return(
    <div className="ui card">
      <div className="image">
      </div>
      <div className="content">
        <span className="right floated">
          <i className="book icon"></i>
        </span>
        <a className="header">{props.name}</a>
        <div className="meta">
          <span className="date">Casting Modifier: {props.casting}</span>
        </div>
        <div>
          <span className="date">Sanity Cost: {props.sanity}</span>
        </div>
        <div className="description" dangerouslySetInnerHTML={{__html: props.description}}></div>
      </div>
      <button className="ui pink button" onClick={() => props.discard(props.name)}>
        Discard
      </button>
    </div>
  )
}

//Skills

function SkillList(props){
  return(
    props.data.map((card) =>
      <Skill
        name={card.name}
        modifier={card.modifier}
        description={card.description}
        discard={props.discard}
      />
    )
  )
}

function Skill(props){
  return(
    <div className="ui card">
      <div className="image">
      </div>
      <div className="content">
        <a className="header">{props.name}</a>
        <div className="meta">
          <span className="date">Modifier: {props.modifier}</span>
        </div>
        <div className="description" dangerouslySetInnerHTML={{__html: props.description}}></div>
      </div>
      <button className="ui yellow button" onClick={() => props.discard(props.name)}>
        Discard
      </button>
    </div>
  )
}

function AllCards(props) {

  return(
    <div className="ui centered stackable cards">
      <CommonItemList
        data={props.dataCommon}
        discard={props.discardCommon}
      />

      <UniqueItemList
        data={props.dataUnique}
        discard={props.discardUnique}
      />

      <SpellList
        data={props.dataSpell}
        discard={props.discardSpell}
      />

      <SkillList
        data={props.dataSkill}
        discard={props.discardSkill}
      />
    </div>
  )
}

function Menu(props){
  return(
    <div class="one row centered column">
      <button className="ui brown button" onClick={ () => props.drawCommon()}>
        Common
      </button>
      <button className="ui purple button" onClick={ () => props.drawUnique()}>
        Unique
      </button>
      <button className="ui pink button" onClick={ () => props.drawSpell()}>
        Spell
      </button>
      <button className="ui yellow button" onClick={ () => props.drawSkill()}>
        Skill
      </button>
    </div>
  )
}

function MythosList(props){
  return(
    <div className="three column row">
      <Mythos
        data={props.dataEnv}
      />
      <Mythos
        data={props.dataRum}
      />
      <Mythos
        data={props.dataLast}
      />
    </div>
  )
}

function Mythos(props){
  return(
    <div className="column">
      <div className="ui centered card">
        <div className="image">
        </div>
        <div className="content">
          <a className="header">{props.data.name}</a>
          <div className="meta">
            <span className="date">{props.data.type}</span>
          </div>
            <span className="date">black: {props.data["black"]}</span>
          <div>
          </div>
            <span className="date">white: {props.data["white"]}</span>
          <div>
          </div>
            <span className="date">clue appears at: {props.data["clue appears at"]}</span>
          <div>
          </div>
            <span className="date">gate location: {props.data["gate location"]}</span>
          <div>
          </div>
          <div className="description" dangerouslySetInnerHTML={{__html: props.data.description}}></div>
        </div>
      </div>
    </div>
  )
}

function Gate(props){
  return(
    <div className="one column row">
      <div className="ui centered card">
        <div className="image">
        </div>
        <div className="content">
          <a className="header">{props.data.color}</a>
          <div className="description" dangerouslySetInnerHTML={{__html: props.data.description}}>
          </div>
        </div>
      </div>
    </div>
  )
}

