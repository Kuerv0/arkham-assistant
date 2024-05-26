import React from 'react';

export function Inventory( {ctx, G, moves} ) {
  const handleDiscardCommon = (name) => moves.discardCard(name, "commonItems")
  const handleDiscardUnique = (name) => moves.discardCard(name, "uniqueItems")
  const handleDiscardSpell = (name) => moves.discardCard(name, "spells")
  const handleDiscardSkill = (name) => moves.discardCard(name, "skills")
  const handleDiscardAlly = (name) => moves.discardCard(name, "allies")

  const handleDrawCommon = () => moves.drawCard("commonItems")
  const handleDrawUnique = () => moves.drawCard("uniqueItems")
  const handleDrawSpell = () => moves.drawCard("spells")
  const handleDrawSkill = () => moves.drawCard("skills")
  const handleDrawAlly = () => moves.drawCard("allies")

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
        dataAllies={G.players[ctx["currentPlayer"]]["allies"]}
        discardAlly={handleDiscardAlly}
        dataBlessing={G.players[ctx["currentPlayer"]]["blessing"]}
        dataCurse={G.players[ctx["currentPlayer"]]["curse"]}
        dataRetainer={G.players[ctx["currentPlayer"]]["retainer"]}
        dataLoan={G.players[ctx["currentPlayer"]]["loan"]}
        dataMembership={G.players[ctx["currentPlayer"]]["membership"]}
      />
      <div className="three row centered column">
        <MythosList
          dataEnv={G["mythosEnv"]}
          dataRum={G["mythosRum"]}
          dataLast={G["mythosLast"]}
        />
      </div>
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
        <span className="right floated">
          <i className="book icon"></i>
        </span>
        <a className="header">{props.name}</a>
        <div className="meta">
          <span className="date">{props.modifier}</span>
        </div>
        <div className="description" dangerouslySetInnerHTML={{__html: props.description}}></div>
      </div>
      <button className="ui orange button" onClick={() => props.discard(props.name)}>
        Discard
      </button>
    </div>
  )
}

// Allies
function AlliesList(props){
  return(
    props.data.map((card) =>
      <Ally
        name={card.name}
        modifier={card.modifier}
        description={card.description}
        discard={props.discard}
      />
    )
  )
}

function Ally(props){
  return(
    <div className="ui card">
      <div className="image">
      </div>
      <div className="content">
        <span className="right floated">
          <i className="user icon"></i>
        </span>
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

function Blessing(props){
  if (props.data === 1){
    return(
      <div className="ui card">
        <div className="image">
        </div>
        <div className="content">
          <span className="right floated">
            <i className="sun icon"></i>
          </span>
          <a className="header">Blessing</a>
          <div className="description"><b>Upkeep:</b> Roll a die and discard this card on a 1.<br /> When rolling dice, you score successes on a 4, 5, or 6. If you are <i>Cursed</i>, discard this card instead of gaining a <i>Curse</i> card.</div>
        </div>
      </div>
    )
  }
}

function Curse(props){
  if (props.data === 1){
    return(
      <div className="ui card">
        <div className="image">
        </div>
        <div className="content">
          <span className="right floated">
            <i className="tint icon"></i>
          </span>
          <a className="header">Curse</a>
          <div className="description"><b>Upkeep:</b> Roll a die and discard this card on a 1.<br /> When rolling dice, you only score successes on a 6. If you are <i>Blessed</i>, discard this card instead of gaining a <i>Blessing</i> card.</div>
        </div>
      </div>
    )
  }
}

function Retainer(props){
  if (props.data === 1){
    return(
      <div className="ui card">
        <div className="image">
        </div>
        <div className="content">
          <span className="right floated">
            <i className="sun icon"></i>
          </span>
          <a className="header">Retainer</a>
          <div className="description"><b>Upkeep:</b> Gain $2, then roll a die. Discard this card on a 1.</div>
        </div>
      </div>
    )
  }
}

function Loan(props){
  if (props.data === 1){
    return(
      <div className="ui card">
        <div className="image">
        </div>
        <div className="content">
          <span className="right floated">
            <i className="sun icon"></i>
          </span>
          <a className="header">Bank Loan</a>
          <div className="description">Gain $10 when you take this card.<br /><b>Upkeep:</b> Roll a die. On a 1-3, pay $1 or discard all of your items along with this card. You cannot get another Bank Loan this game.<br /><b>Any Phase:</b> Pay $10 to pay off your Bank Loan and discad this card. You may choose to take out a new Bank Loan later on during this game.</div>
        </div>
      </div>
    )
  }
}

function Membership(props){
  if (props.data === 1){
    return(
      <div className="ui card">
        <div className="image">
        </div>
        <div className="content">
          <span className="right floated">
            <i className="sun icon"></i>
          </span>
          <a className="header">Silver Twilight Lodge Membership</a>
          <div className="description"><b>Any Phase:</b> Whenever you have an encounter at the Silver Twilight Lodge, you have an encounter at the Inner Sanctum instead.</div>
        </div>
      </div>
    )
  }
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

      <AlliesList
        data={props.dataAllies}
        discard={props.discardAlly}
      />

      <Blessing
        data={props.dataBlessing}
      />

      <Curse
        data={props.dataCurse}
      />

      <Retainer
        data={props.dataRetainer}
      />

      <Loan
        data={props.dataLoan}
      />

      <Membership
        data={props.dataMembership}
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
  let mythosList = [props.dataLast, props.dataEnv, props.dataRum]
  return(
    mythosList.map((card) => 
      <Mythos
        data={card}
      />
    )
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
