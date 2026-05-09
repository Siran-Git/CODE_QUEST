/* ============================================================
   steps.js
   All game content — story scenes, codex concepts, challenges.

   Each step has a 'type':
     'story'     → narrative scene, just text + Continue button
     'concept'   → Codex panel with explanation + code example
     'challenge' → Multiple-choice question with hints & feedback

   Challenge steps also have:
     hint        → shown to Seasoned Mage mode
     hintYoung   → shown to Young Explorer mode
     choices[]   → array of { label, correct }
     feedbackCorrect / feedbackWrong
     xp          → XP awarded for a correct answer
   ============================================================ */

const STEPS = {
  /* ══════════════════════════════════════════════════════
     ENGLISH STEPS
     ══════════════════════════════════════════════════════ */
  en: [
    /* ── Scene 1 ── */
    {
      type: "story",
      icon: "🏰",
      title: "The Crumbling Tower",
      text: `You arrive at the <strong>Tower of Remembrance</strong> — the heart of Syntaxia.
              Inside, shelves of glowing crystals line the walls.
              Each crystal is a <strong>variable</strong>: a magical container with a name,
              holding something precious inside.<br><br>
              But the shelves are shattered. The crystals have gone dark.
              Sera, the wizard's young apprentice, is nearly in tears.
              <em>"Without variables,"</em> she whispers,
              <em>"no spell can remember anything — not a hero's name, not a score,
              not even whether the drawbridge is open. Help us, please!"</em>`,
    },

    /* ── Concept 1 ── */
    {
      type: "concept",
      icon: "💎",
      title: "The First Crystal: What Is a Variable?",
      text: `You find one crystal still glowing faintly.
              The Codex pulses: <em>"A variable is a named container that holds a value.
              Give it a name, store something inside — and the spell will always remember it."</em>`,

      conceptTitle: "Variables — Named Magical Containers",
      conceptExplanation: `Think of a variable like a labelled jar. The label is the name
                           (like heroName), and what's inside is the value (like "Sera").
                           You use the word 'let' to create a new one.`,
      codeHtml: `<span class="kw">let</span> <span class="var">heroName</span>  = <span class="str">"Sera"</span>;   <span class="cmt">// stores text</span>
<span class="kw">let</span> <span class="var">heroLevel</span> = <span class="num">1</span>;       <span class="cmt">// stores a number</span>
<span class="kw">let</span> <span class="var">isHero</span>   = <span class="num">true</span>;    <span class="cmt">// stores true or false</span>

<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">heroName</span>);  <span class="cmt">// prints: Sera</span>`,
    },

    /* ── Challenge 1 ── */
    {
      type: "challenge",
      icon: "⚔️",
      title: "Trial I",
      text: `Sera hands you a broken crystal. It once stored the <strong>name of the kingdom</strong>.
              Which spell correctly creates a variable called <code>kingdomName</code>
              holding the text <code>"Syntaxia"</code>?`,

      hint: `💡 Pattern: <strong>let</strong> [name] = [value]; — Text values must be wrapped in "quotes".`,
      hintYoung: `💡 Think of filling a jar: first write <strong>let</strong>, then the jar's name,
                  then <strong>=</strong>, then what goes inside —
                  and since it's a word, put "quotes" around it!`,

      choices: [
        { label: `let kingdomName = "Syntaxia";`, correct: true },
        { label: `kingdomName == "Syntaxia"`, correct: false },
        { label: `let "Syntaxia" = kingdomName;`, correct: false },
        { label: `var = Syntaxia kingdomName;`, correct: false },
      ],

      feedbackCorrect: `✨ The crystal blazes to life! <strong>let</strong> creates the variable,
                        <strong>kingdomName</strong> is its name, and <strong>= "Syntaxia"</strong>
                        stores the text. Quotes tell the spell it's text — called a <em>String</em>!`,
      feedbackWrong: `The crystal flickers. Remember: <strong>let name = value;</strong> —
                        and text values always need "quotes".
                        Find the option that follows this exact order!`,
      xp: 25,
    },

    /* ── Scene 2 ── */
    {
      type: "story",
      icon: "🌌",
      title: "The Three Kinds of Magic",
      text: `As you restore crystals, the Codex whispers a secret:
              <em>not all values are the same kind of magic.</em><br><br>
              Some crystals glow with <strong>words and sentences</strong>.
              Others hum with <strong>numbers</strong>.
              And a few pulse with one of only two truths: <strong>true or false</strong>.<br><br>
              The wizard's parrot hops onto your shoulder:
              <em>"Text is a String! Counting is a Number! Yes-or-no is a Boolean!
              Know the three, young mage!"</em>`,
    },

    /* ── Concept 2 ── */
    {
      type: "concept",
      icon: "📚",
      title: "The Three Enchantment Types",
      text: `The Codex reveals the three fundamental types —
              every variable in existence is one of these.`,

      conceptTitle: "String · Number · Boolean",
      conceptExplanation: `String = text in "quotes".
                           Number = a numeric value, no quotes.
                           Boolean = only ever true or false (no quotes).
                           Use the wrong type and your spell misfires!`,
      codeHtml: `<span class="cmt">// 🔤 STRING — text, always in quotes</span>
<span class="kw">let</span> <span class="var">spellName</span> = <span class="str">"Fireball"</span>;

<span class="cmt">// 🔢 NUMBER — just the digits, no quotes</span>
<span class="kw">let</span> <span class="var">manaCost</span>  = <span class="num">42</span>;
<span class="kw">let</span> <span class="var">damage</span>    = <span class="num">8.5</span>;

<span class="cmt">// ✅ BOOLEAN — only true or false</span>
<span class="kw">let</span> <span class="var">isEnchanted</span> = <span class="num">true</span>;
<span class="kw">let</span> <span class="var">isDark</span>      = <span class="num">false</span>;`,
    },

    /* ── Challenge 2 ── */
    {
      type: "challenge",
      icon: "⚔️",
      title: "Trial II",
      text: `A crystal labeled <strong>playerScore</strong> must store
              the number <strong>100</strong>.
              Which spell correctly enchants it?`,

      hint: `💡 Numbers never need quotes. "100" would become text — you couldn't do math with it!`,
      hintYoung: `💡 Ask: is 100 a word or a number?
                  Numbers go in without "quotes".
                  Which answer puts 100 in without quotes?`,

      choices: [
        { label: `let playerScore = "100";`, correct: false },
        { label: `let playerScore = 100;`, correct: true },
        { label: `let 100 = playerScore;`, correct: false },
        { label: `string playerScore = 100;`, correct: false },
      ],

      feedbackCorrect: `⚡ Exactly! Numbers don't wear quotes.
                        <strong>"100"</strong> would be text — you couldn't add it to another number.
                        Without quotes, <strong>100</strong> is a real number the spell can calculate with!`,
      feedbackWrong: `The crystal cracks. Numbers don't need quotes.
                        <strong>"100"</strong> looks like a number but is treated as text.
                        Try the answer where 100 has no quotes!`,
      xp: 25,
    },

    /* ── Scene 3 ── */
    {
      type: "story",
      icon: "🌿",
      title: "The Living Crystals",
      text: `Deep in the vault you find special crystals — they're <em>alive</em>.
              Unlike frozen memory stones, these can <strong>change their value</strong>.<br><br>
              <em>"When a hero levels up,"</em> Sera smiles,
              <em>"their power must grow too.
              If a variable couldn't change, every hero would be stuck at level 1 forever!"</em><br><br>
              You see a crystal labeled <strong>heroLevel</strong> glowing with <strong>1</strong>.
              You whisper a new number — and it shifts to <strong>2</strong>.
              The tower rumbles with joy.`,
    },

    /* ── Concept 3 ── */
    {
      type: "concept",
      icon: "🔄",
      title: "Updating a Variable",
      text: `The Codex shows you how to change what a variable holds
              after it has been created.`,

      conceptTitle: `Changing a Variable's Value`,
      conceptExplanation: `To update a variable, write its name, then = and the new value.
                           No 'let' this time — that's only for creating.
                           The old value is replaced instantly.`,
      codeHtml: `<span class="kw">let</span> <span class="var">heroLevel</span> = <span class="num">1</span>;   <span class="cmt">// create it</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">heroLevel</span>); <span class="cmt">// → 1</span>

<span class="var">heroLevel</span> = <span class="num">2</span>;          <span class="cmt">// update it (no 'let'!)</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">heroLevel</span>); <span class="cmt">// → 2</span>

<span class="var">heroLevel</span> = <span class="var">heroLevel</span> + <span class="num">1</span>;  <span class="cmt">// grow using itself!</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">heroLevel</span>); <span class="cmt">// → 3</span>`,
    },

    /* ── Challenge 3 ── */
    {
      type: "challenge",
      icon: "⚔️",
      title: "Trial III — The Final Reckoning",
      text: `A variable <code>score</code> starts at <strong>10</strong>.
              Then this spell runs:<br><br>
              <code>score = score + 5;</code><br><br>
              What does <code>score</code> equal now?`,

      hint: `💡 The right side of = is solved first.
                  score is 10, so score + 5 = ?
                  Then that answer is stored back into score.`,
      hintYoung: `💡 Step by step: score = 10.
                  score + 5 means 10 + 5.
                  What is 10 + 5? That becomes the new score!`,

      choices: [
        { label: `"score + 5"  (text)`, correct: false },
        { label: `10  (unchanged)`, correct: false },
        { label: `15`, correct: true },
        { label: `5`, correct: false },
      ],

      feedbackCorrect: `🏆 Brilliant! Right side first: score (10) + 5 = <strong>15</strong>.
                        That result gets stored back into score.
                        Variables can use their own value to grow —
                        that's the secret of all great spells!`,
      feedbackWrong: `The crystal dims. Step by step: score holds 10.
                        score + 5 = 10 + 5 = 15.
                        That 15 is stored back into score. So score becomes 15!`,
      xp: 50,
    },
  ], // end en

  /* ══════════════════════════════════════════════════════
     TAMIL STEPS
     ══════════════════════════════════════════════════════ */
  ta: [
    /* ── காட்சி 1 ── */
    {
      type: "story",
      icon: "🏰",
      title: "சிதைந்த கோபுரம்",
      text: `நீ <strong>நினைவு கோபுரத்திற்கு</strong> வருகிறாய் — சின்டாக்ஸியாவின் இதயம்.
              உள்ளே, சுவர்களில் ஒளிரும் படிகங்கள் நிரம்பியுள்ளன.
              ஒவ்வொரு படிகமும் ஒரு <strong>மாறி (variable)</strong>:
              ஒரு பெயருடன் கூடிய மந்திர கொள்கலன், அதில் ஏதோ ஒன்று வைக்கப்பட்டுள்ளது.<br><br>
              ஆனால் அலமாரிகள் உடைந்துவிட்டன. படிகங்கள் இருண்டுவிட்டன.
              மாயாவியின் சிறிய சீடி <strong>சேரா</strong> கண்ணீரில் நிற்கிறாள்.
              <em>"மாறிகள் இல்லாமல்,"</em> அவள் கிசுகிசுக்கிறாள்,
              <em>"எந்த மந்திரமும் எதையும் நினைவில் வைக்க முடியாது —
              ஒரு வீரரின் பெயரையும், ஒரு மதிப்பெண்ணையும் கூட.
              தயவுசெய்து உதவுங்கள்!"</em>`,
    },

    /* ── கருத்தாக்கம் 1 ── */
    {
      type: "concept",
      icon: "💎",
      title: "முதல் படிகம்: மாறி என்றால் என்ன?",
      text: `ஒரு படிகம் இன்னும் மங்கலாக ஒளிர்கிறது.
              கோட்டு நூல் துடிக்கிறது: <em>"ஒரு மாறி என்பது பெயரிடப்பட்ட ஒரு கொள்கலன்.
              அதற்கு ஒரு பெயர் கொடுத்து, உள்ளே ஒன்றை வையுங்கள் —
              மந்திரம் என்றும் அதை நினைவில் வைத்திருக்கும்."</em>`,

      conceptTitle: "மாறிகள் — பெயரிடப்பட்ட மந்திர கொள்கலன்கள்",
      conceptExplanation: `ஒரு மாறியை பெயரிடப்பட்ட ஜாடி போல் நினைத்துக்கொள்.
                           லேபிள் என்பது பெயர் (heroName போல),
                           உள்ளே இருப்பது மதிப்பு ("சேரா" போல).
                           புதியதை உருவாக்க 'let' என்ற வார்த்தை பயன்படுத்துவோம்.`,
      codeHtml: `<span class="kw">let</span> <span class="var">heroName</span>  = <span class="str">"சேரா"</span>;  <span class="cmt">// உரையை சேமிக்கிறது</span>
<span class="kw">let</span> <span class="var">heroLevel</span> = <span class="num">1</span>;       <span class="cmt">// எண்ணை சேமிக்கிறது</span>
<span class="kw">let</span> <span class="var">isHero</span>   = <span class="num">true</span>;    <span class="cmt">// true அல்லது false</span>

<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">heroName</span>);  <span class="cmt">// அச்சிடுகிறது: சேரா</span>`,
    },

    /* ── சோதனை 1 ── */
    {
      type: "challenge",
      icon: "⚔️",
      title: "சோதனை I",
      text: `சேரா உனக்கு ஒரு உடைந்த படிகம் தருகிறாள்.
              அது <strong>இராஜ்யத்தின் பெயரை</strong> சேமித்திருந்தது.
              <code>kingdomName</code> என்ற மாறியை <code>"Syntaxia"</code> உரையுடன்
              உருவாக்கும் சரியான மந்திரம் எது?`,

      hint: `💡 முறை: <strong>let</strong> [பெயர்] = [மதிப்பு]; — உரை மதிப்புகளை "மேற்கோள் குறிகளில்" வைக்க வேண்டும்.`,
      hintYoung: `💡 ஒரு ஜாடியை நிரப்புவது போல்:
                  முதலில் <strong>let</strong>, பிறகு பெயர்,
                  பிறகு <strong>=</strong>, பிறகு மதிப்பு —
                  வார்த்தையாக இருப்பதால் "மேற்கோள்" போடுங்கள்!`,

      choices: [
        { label: `let kingdomName = "Syntaxia";`, correct: true },
        { label: `kingdomName == "Syntaxia"`, correct: false },
        { label: `let "Syntaxia" = kingdomName;`, correct: false },
        { label: `var = Syntaxia kingdomName;`, correct: false },
      ],

      feedbackCorrect: `✨ படிகம் மீண்டும் ஒளிர்கிறது!
                        <strong>let</strong> மாறியை உருவாக்குகிறது,
                        <strong>kingdomName</strong> அதன் பெயர்,
                        <strong>= "Syntaxia"</strong> உரையை சேமிக்கிறது.
                        மேற்கோள் குறிகள் இது String என்பதை மந்திரத்திற்கு தெரிவிக்கின்றன!`,
      feedbackWrong: `படிகம் மின்னுகிறது. நினைவில் வையுங்கள்:
                        <strong>let பெயர் = மதிப்பு;</strong> —
                        உரைக்கு எப்போதும் "மேற்கோள்" தேவை.
                        இந்த வரிசையை சரியாக பின்பற்றும் விடையை தேடுங்கள்!`,
      xp: 25,
    },

    /* ── காட்சி 2 ── */
    {
      type: "story",
      icon: "🌌",
      title: "மூன்று வகை மந்திரங்கள்",
      text: `நீ படிகங்களை மீட்டெடுக்கும்போது,
              கோட்டு நூல் ஒரு இரகசியம் கிசுகிசுக்கிறது:
              <em>அனைத்து மதிப்புகளும் ஒரே வகை மந்திரத்தால் ஆனவை அல்ல.</em><br><br>
              சில படிகங்கள் <strong>வார்த்தைகளுடன்</strong> ஒளிர்கின்றன.
              வேறு சில <strong>எண்களுடன்</strong> ரீங்காரமிடுகின்றன.
              சிலவற்றில் இரண்டு உண்மைகளில் ஒன்று: <strong>true அல்லது false</strong>.<br><br>
              மாயாவியின் கிளி கத்துகிறது:
              <em>"உரை என்பது String! எண்ணுவது Number! ஆம்-இல்லை என்பது Boolean!"</em>`,
    },

    /* ── கருத்தாக்கம் 2 ── */
    {
      type: "concept",
      icon: "📚",
      title: "மூன்று வகை மந்திர வகைகள்",
      text: `கோட்டு நூல் மூன்று அடிப்படை வகைகளை வெளிப்படுத்துகிறது —
              ஒவ்வொரு மாறியும் இவற்றில் ஒன்றாக இருக்கும்.`,

      conceptTitle: "String · Number · Boolean",
      conceptExplanation: `String = "மேற்கோள் குறிகளில்" உரை.
                           Number = எண் மதிப்பு, மேற்கோள் இல்லை.
                           Boolean = true அல்லது false மட்டுமே.
                           தவறான வகை பயன்படுத்தினால் மந்திரம் தவறிவிடும்!`,
      codeHtml: `<span class="cmt">// 🔤 STRING — மேற்கோள் குறிகளில் உரை</span>
<span class="kw">let</span> <span class="var">spellName</span> = <span class="str">"Fireball"</span>;

<span class="cmt">// 🔢 NUMBER — எண்கள், மேற்கோள் இல்லை</span>
<span class="kw">let</span> <span class="var">manaCost</span>  = <span class="num">42</span>;
<span class="kw">let</span> <span class="var">damage</span>    = <span class="num">8.5</span>;

<span class="cmt">// ✅ BOOLEAN — true அல்லது false மட்டுமே</span>
<span class="kw">let</span> <span class="var">isEnchanted</span> = <span class="num">true</span>;
<span class="kw">let</span> <span class="var">isDark</span>      = <span class="num">false</span>;`,
    },

    /* ── சோதனை 2 ── */
    {
      type: "challenge",
      icon: "⚔️",
      title: "சோதனை II",
      text: `<strong>playerScore</strong> படிகம் <strong>100</strong> என்ற எண்ணை சேமிக்க வேண்டும்.
              எந்த மந்திரம் சரியாக அதை மயக்குகிறது?`,

      hint: `💡 எண்களுக்கு மேற்கோள் குறிகள் தேவையில்லை. "100" என்பது உரை ஆகிவிடும், கணக்கு போட முடியாது!`,
      hintYoung: `💡 கேளுங்கள்: 100 ஒரு வார்த்தையா அல்லது எண்ணா?
                  எண்கள் "மேற்கோள்" இல்லாமல் போகும்.
                  எந்த விடை 100-ஐ மேற்கோள் இல்லாமல் வைக்கிறது?`,

      choices: [
        { label: `let playerScore = "100";`, correct: false },
        { label: `let playerScore = 100;`, correct: true },
        { label: `let 100 = playerScore;`, correct: false },
        { label: `string playerScore = 100;`, correct: false },
      ],

      feedbackCorrect: `⚡ சரியாக! எண்களுக்கு மேற்கோள் வேண்டாம்.
                        <strong>"100"</strong> உரையாக இருக்கும் — வேறு எண்ணுடன் கூட்ட முடியாது.
                        மேற்கோள் இல்லாமல், <strong>100</strong> உண்மையான எண்ணாக மந்திரம் கணக்கிடும்!`,
      feedbackWrong: `படிகம் வெடிக்கிறது. எண்களுக்கு மேற்கோள் குறிகள் தேவையில்லை.
                        <strong>"100"</strong> உரையாகவே நடத்தப்படும்.
                        100-ஐ மேற்கோள் இல்லாமல் வைக்கும் விடையை தேடுங்கள்!`,
      xp: 25,
    },

    /* ── காட்சி 3 ── */
    {
      type: "story",
      icon: "🌿",
      title: "உயிர் வாழும் படிகங்கள்",
      text: `கோட்டு ஆழத்தில் நீ சிறப்பு படிகங்களை காண்கிறாய் — அவை <em>உயிர் வாழ்கின்றன</em>.
              உறைந்த நினைவு கல்லுகளை போல் அல்லாமல்,
              இவை <strong>தங்கள் மதிப்பை மாற்றிக்கொள்ளலாம்</strong>.<br><br>
              <em>"ஒரு வீரர் நிலை உயரும்போது,"</em> சேரா சிரிக்கிறாள்,
              <em>"அவரது சக்தியும் வளர வேண்டும்.
              மாறி மாற முடியாவிட்டால்,
              ஒவ்வொரு வீரனும் நிலை 1-இல் தங்கிவிடுவான்!"</em><br><br>
              <strong>heroLevel</strong> படிகம் <strong>1</strong>-உடன் ஒளிர்கிறது.
              நீ புதிய எண் கிசுகிசுக்கிறாய் — அது <strong>2</strong>-ஆக மாறுகிறது.
              கோபுரம் மகிழ்ச்சியுடன் நடுங்குகிறது.`,
    },

    /* ── கருத்தாக்கம் 3 ── */
    {
      type: "concept",
      icon: "🔄",
      title: "மாறியை புதுப்பித்தல்",
      text: `கோட்டு நூல் உருவாக்கப்பட்ட பிறகு மாறியை எவ்வாறு மாற்றுவது என்று காட்டுகிறது.`,

      conceptTitle: "மாறியின் மதிப்பை மாற்றுதல்",
      conceptExplanation: `மாறியை புதுப்பிக்க, அதன் பெயரை எழுதி,
                           = மற்றும் புதிய மதிப்பு போடுங்கள்.
                           இம்முறை 'let' தேவையில்லை — அது உருவாக்கும்போது மட்டுமே.
                           பழைய மதிப்பு உடனே மாறிவிடும்.`,
      codeHtml: `<span class="kw">let</span> <span class="var">heroLevel</span> = <span class="num">1</span>;   <span class="cmt">// உருவாக்கு</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">heroLevel</span>); <span class="cmt">// → 1</span>

<span class="var">heroLevel</span> = <span class="num">2</span>;          <span class="cmt">// புதுப்பி ('let' இல்லாமல்!)</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">heroLevel</span>); <span class="cmt">// → 2</span>

<span class="var">heroLevel</span> = <span class="var">heroLevel</span> + <span class="num">1</span>;  <span class="cmt">// தன்னையே பயன்படுத்தி வளரு!</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="var">heroLevel</span>); <span class="cmt">// → 3</span>`,
    },

    /* ── சோதனை 3 ── */
    {
      type: "challenge",
      icon: "⚔️",
      title: "சோதனை III — இறுதி போர்",
      text: `<code>score</code> மாறி <strong>10</strong>-ல் தொடங்குகிறது.
              பிறகு இந்த மந்திரம் இயங்குகிறது:<br><br>
              <code>score = score + 5;</code><br><br>
              இப்போது <code>score</code> என்ன?`,

      hint: `💡 = என்பதன் வலது பக்கம் முதலில் கணக்கிடப்படும்.
                  score = 10, எனவே score + 5 = ?
                  பிறகு அந்த விடை score-ல் சேமிக்கப்படும்.`,
      hintYoung: `💡 படிப்படியாக: score = 10.
                  score + 5 என்றால் 10 + 5.
                  10 + 5 என்ன? அதுவே புதிய score!`,

      choices: [
        { label: `"score + 5"  (உரை)`, correct: false },
        { label: `10  (மாறவில்லை)`, correct: false },
        { label: `15`, correct: true },
        { label: `5`, correct: false },
      ],

      feedbackCorrect: `🏆 அற்புதம்! வலது பக்கம் முதலில்: score (10) + 5 = <strong>15</strong>.
                        அந்த முடிவு score-ல் மீண்டும் சேமிக்கப்படுகிறது.
                        மாறிகள் தங்கள் சொந்த மதிப்பை பயன்படுத்தி வளரலாம் —
                        அதுவே சிறந்த மந்திரங்களின் இரகசியம்!`,
      feedbackWrong: `படிகம் மங்குகிறது. படிப்படியாக நினை:
                        score-ல் 10 உள்ளது. score + 5 = 10 + 5 = 15.
                        அந்த 15 score-ல் சேமிக்கப்படுகிறது. எனவே score = 15!`,
      xp: 50,
    },
  ], // end ta
}; // end STEPS
