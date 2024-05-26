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
    <div className="ui centered grid">
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
      <Location
        data={G["locationLast"]}
      />
      <div>
        {G["players"][ctx["currentPlayer"]]["investigator"]["name"]}
      </div>
      <div>
        {G["ancientOne"]["name"]}
      </div>
      <div className="row">
        <Convertido
          data={G["lastConversion"]}
        />
      </div>
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
        <i className="left floated dollar sign icon">{props.price}</i>
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
        <i className="left floated dollar sign icon">{props.price}</i>
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
          <span className="date">{props.modifier}</span>
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
    <div className="one row centered column">
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
    <div className="three row centered column">
      <Mythos
        data={props.dataLast}
      />
      <Mythos
        data={props.dataEnv}
      />
      <Mythos
        data={props.dataRum}
      />
    </div>
  )
}

function Mythos(props){
  return(
    <div className="ui centered stackable cards">
      <div className="ui card">
        <div className="image">
        </div>
        <div className="content">
          <div>
            <i className="street view icon"></i>
            <span className="date">{props.data["gate location"]}</span>
          </div>
            <i className="search icon"></i>
            <span className="date">{props.data["clue appears at"]}</span>
          <div>
          </div>
            <i className="circle icon"></i>
            <span className="date">{props.data["black"]}</span>
          <div>
          </div>
            <i className="circle outline icon"></i>
            <span className="date">{props.data["white"]}</span>
          <div>
          </div>
        </div>
        <div className="extra content">
          <a className="header">{props.data.name}</a>
          <div className="meta">
            <span className="date">{props.data.type}</span>
          </div>
          <div className="description" dangerouslySetInnerHTML={{__html: props.data.description}}></div>
        </div>
      </div>
    </div>
  )
}

function Gate(props){
  let name = "ui "
  name = name.concat(props.data.color, " card")
  return(
    <div className="row">
      <div className={name}>
        <div className="image">
        </div>
        <div className="content">
          <div className="description" dangerouslySetInnerHTML={{__html: props.data.description}}>
          </div>
        </div>
      </div>
    </div>
  )
}

function Location(props){
  return(
    <div className="row">
      <div className="ui centered card">
        <div className="image">
        </div>
        <div className="content">
          <div className="description" dangerouslySetInnerHTML={{__html: props.data.text}}>
          </div>
        </div>
      </div>
    </div>
  )
}

function Convertido(props){
  return(
    <div className="description" dangerouslySetInnerHTML={{__html: props.data}}>
    </div>
  )
}
