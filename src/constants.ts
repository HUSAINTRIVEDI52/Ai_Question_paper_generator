import { Config, QuestionCounts } from './types';

export const STANDARDS = ['5', '6', '7', '8', '9', '10'];
export const SUBJECTS = ['Maths', 'Science', 'English', 'Gujarati', 'Social Science'];
export const MEDIUMS = ['English', 'Gujarati'];
export const DIFFICULTIES: ['Easy', 'Medium', 'Hard'] = ['Easy', 'Medium', 'Hard'];

export const CHAPTERS: { [standard: string]: { [medium: string]: { [subject: string]: string[] } } } = {
  '5': {
    'English': {
      'Maths': ['The Fish Tale', 'Shapes and Angles', 'How Many Squares?', 'Parts and Wholes', 'Does it Look the Same?'],
      'Science': ['Super Senses', 'A Snake Charmer\'s Story', 'From Tasting to Digesting', 'Mangoes Round the Year', 'Seeds and Seeds'],
      'Social Science': ['Who will do this?', 'Across the Wall', 'No Place for Us?', 'A Seed tells a Farmer\'s Story', 'Whose Forests?'],
      'English': ['The Ice-Cream Man', 'Wonderful Waste!', 'Teamwork', 'Flying Together', 'My Shadow'],
    },
    'Gujarati': {
      'Maths': ['રાષ્ટ્રીય ફળ કેરી', 'આકાર અને ખૂણા', 'કેટલા ચોરસ?', 'ભાગ અને પૂર્ણ', 'તે સરખું દેખાય છે?'],
      'Science': ['મજાની ઇન્દ્રિયો', 'સપેરાની વાર્તા', 'સ્વાદથી પાચન સુધી', 'આંબા બારેમાસ', 'બીજ, બીજ, બીજ'],
      'Social Science': ['આ કોણ કરશે?', 'દિવાલ ઓળંગી લીધી', 'અમારે માટે કોઈ જગ્યા નથી?', 'બીજ કહે છે ખેડૂતની વાર્તા', 'કોના જંગલો?'],
      'Gujarati': ['ચબૂતરો', 'પર્વત તારા', 'મહેનતનો રોટલો', 'સુંદર સુંદર', 'શરદીના પ્રતાપે'],
    }
  },
  '6': {
    'English': {
      'Maths': ['Knowing Our Numbers', 'Whole Numbers', 'Playing with Numbers', 'Basic Geometrical Ideas', 'Understanding Elementary Shapes'],
      'Science': ['Food: Where Does It Come From?', 'Components of Food', 'Fibre to Fabric', 'Sorting Materials into Groups', 'Separation of Substances'],
      'Social Science': ['What, Where, How and When?', 'On the Trail of the Earliest People', 'From Gathering to Growing Food', 'In the Earliest Cities', 'What Books and Burials Tell Us'],
      'English': ['Who Did Patrick’s Homework?', 'How the Dog Found Himself a New Master!', 'Taro’s Reward', 'An Indian-American Woman in Space', 'A Different Kind of School'],
    },
    'Gujarati': {
      'Maths': ['સંખ્યા પરિચય', 'પૂર્ણ સંખ્યાઓ', 'સંખ્યા સાથે રમત', 'ભૂમિતિના પાયાના ખ્યાલો', 'પાયાના આકારોની સમજૂતી'],
      'Science': ['ખોરાક: ક્યાંથી મળે છે?', 'આહારના ઘટકો', 'રેસાથી કાપડ સુધી', 'વસ્તુઓનાં જૂથ બનાવવાં', 'પદાર્થોનું અલગીકરણ'],
      'Social Science': ['ચાલો, ઇતિહાસ જાણીએ', 'આદિમાનવથી સ્થાયી જીવનની સફર', 'પ્રાચીન નગરો અને ગ્રંથો', 'આપણું ઘર પૃથ્વી', 'પૃથ્વીના આવરણો'],
      'Gujarati': ['રેલવે સ્ટેશન', 'હિંદમાતાને સંબોધન', 'દ્વિદલ', 'રવિશંકર મહારાજ', 'મહેનતની મોસમ'],
    }
  },
  '7': {
    'English': {
      'Maths': ['Integers', 'Fractions and Decimals', 'Data Handling', 'Simple Equations', 'Lines and Angles'],
      'Science': ['Nutrition in Plants', 'Nutrition in Animals', 'Fibre to Fabric', 'Heat', 'Acids, Bases and Salts'],
      'Social Science': ['Tracing Changes Through A Thousand Years', 'New Kings and Kingdoms', 'The Delhi Sultans', 'The Mughal Empire', 'Rulers and Buildings'],
      'English': ['Three Questions', 'A Gift of Chappals', 'Gopal and the Hilsa Fish', 'The Ashes That Made Trees Bloom', 'Quality'],
    },
    'Gujarati': {
      'Maths': ['પૂર્ણાંક સંખ્યાઓ', 'અપૂર્ણાંક અને દશાંશ સંખ્યાઓ', 'માહિતીનું નિયમન', 'સાદાં સમીકરણ', 'રેખા અને ખૂણા'],
      'Science': ['વનસ્પતિમાં પોષણ', 'પ્રાણીઓમાં પોષણ', 'રેસાથી કાપડ સુધી', 'ઉષ્મા', 'એસિડ, બેઇઝ અને ક્ષાર'],
      'Social Science': ['બે મહારાજ્યો', 'દિલ્લી સલ્તનત', 'મુઘલ સામ્રાજ્ય', 'મધ્યયુગીન સ્થાપત્યો, શહેરો, વેપારી અને કારੀગરો', 'ભક્તિ આંદોલન અને સુફીવાદ'],
      'Gujarati': ['મેળામાં', 'આજની ઘડી રળિયામણી', 'પરીક્ષા', 'બે ખાનાંનો પરિગ્રહ', 'રાનમાં'],
    }
  },
  '8': {
    'English': {
      'Maths': ['Rational Numbers', 'Linear Equations in One Variable', 'Understanding Quadrilaterals', 'Practical Geometry', 'Data Handling'],
      'Science': ['Crop Production and Management', 'Microorganisms: Friend and Foe', 'Synthetic Fibres and Plastics', 'Materials: Metals and Non-Metals', 'Coal and Petroleum'],
      'Social Science': ['How, When and Where', 'From Trade to Territory', 'Ruling the Countryside', 'Tribals, Dikus and the Vision of a Golden Age', 'When People Rebel'],
      'English': ['The Best Christmas Present in the World', 'The Tsunami', 'Glimpses of the Past', 'Bepin Choudhury’s Lapse of Memory', 'The Summit Within'],
    },
    'Gujarati': {
      'Maths': ['સંમેય સંખ્યાઓ', 'એક ચલ સુરેખ સમીકરણ', 'ચતુષ્કોણની સમજ', 'પ્રાયોગિક ભૂમિતિ', 'માહિતીનું નિયમન'],
      'Science': ['પાક ઉત્પાદન અને વ્યવસ્થાપન', 'સૂક્ષ્મજીવો: મિત્ર અને શત્રુ', 'સંશ્લેષિત (કૃત્રિમ) રેસાઓ અને પ્લાસ્ટિક', 'પદાર્થો: ધાતુ અને અધાતુ', 'કોલસો અને પેટ્રોલિયમ'],
      'Social Science': ['ભારતમાં યુરોપિયન પ્રજાનું આગમન', 'આપણી આસપાસ શું?', 'ભારતનું બંધારણ', 'વેપારી શાસકો કેવી રીતે બન્યા?', 'અંગ્રેજ શાસન સમયે શિક્ષણ અને સમાજ વ્યવસ્થા'],
      'Gujarati': ['બજારમાં', 'એક જ દે ચિનગારી', 'જુમો ભિસ્તી', 'તને ઓળખું છું, મા', 'અઢી આના'],
    }
  },
  '9': {
    'English': {
      'Maths': ['Number Systems', 'Polynomials', 'Coordinate Geometry', 'Linear Equations in Two Variables', 'Introduction to Euclid’s Geometry'],
      'Science': ['Matter in Our Surroundings', 'Is Matter Around Us Pure?', 'Atoms and Molecules', 'Structure of the Atom', 'The Fundamental Unit of Life'],
      'Social Science': ['The French Revolution', 'Socialism in Europe and the Russian Revolution', 'Nazism and the Rise of Hitler', 'Forest Society and Colonialism', 'Pastoralists in the Modern World'],
      'English': ['The Fun They Had', 'The Sound of Music', 'The Little Girl', 'A Truly Beautiful Mind', 'The Snake and the Mirror'],
    },
    'Gujarati': {
      'Maths': ['સંખ્યા પદ્ધતિ', 'બહુપદીઓ', 'યામ ભૂમિતિ', 'દ્વિચલ સુરેખ સમીકરણો', 'યુક્લિડની ભૂમિતિનો પરિચય'],
      'Science': ['આપણી આસપાસમાં દ્રવ્ય', 'શું આપણી આસપાસના દ્રવ્યો શુદ્ધ છે?', 'પરમાણુઓ અને અણુઓ', 'પરમાણુનું બંધારણ', 'સજીવનો પાયાનો એકમ'],
      'Social Science': ['ભારતમાં બ્રિટીશ સત્તાનો ઉદય', 'પ્રથમ વિશ્વયુદ્ધ અને રશિયન ક્રાંતિ', 'નૂતન વિશ્વ તરફ પ્રયાણ', 'ભારતની રાષ્ટ્રીય ચળવળો', 'ભારત: આઝાદી તરફ પ્રયાણ'],
      'Gujarati': ['સાંજ સમે શામળિયો', 'ચોરી અને પ્રાયશ્ચિત', 'પછે શામળિયોજી બોલિયા', 'ગોપાળબાપા', 'ગૂર્જરીના ગૃહ કુંજે'],
    }
  },
  '10': {
    'English': {
      'Maths': ['Real Numbers', 'Polynomials', 'Pair of Linear Equations in Two Variables', 'Quadratic Equations', 'Arithmetic Progressions'],
      'Science': ['Chemical Reactions and Equations', 'Acids, Bases and Salts', 'Metals and Non-metals', 'Carbon and its Compounds', 'Life Processes'],
      'Social Science': ['The Rise of Nationalism in Europe', 'Nationalism in India', 'The Making of a Global World', 'The Age of Industrialisation', 'Print Culture and the Modern World'],
      'English': ['A Letter to God', 'Nelson Mandela: Long Walk to Freedom', 'Two Stories about Flying', 'From the Diary of Anne Frank', 'The Hundred Dresses–I'],
    },
    'Gujarati': {
      'Maths': ['વાસ્તવિક સંખ્યાઓ', 'બહુપદીઓ', 'દ્વિચલ સુરેખ સમીકરણયુગ્મ', 'દ્વિઘાત સમીકરણ', 'સમાંતર શ્રેણી'],
      'Science': ['રાસાયણિક પ્રક્રિયાઓ અને સમીકરણો', 'એસિડ, બેઇઝ અને ક્ષાર', 'ધાતુઓ અને અધાતુઓ', 'કાર્બન અને તેના સંયોજનો', 'જૈવિક ક્રિયાઓ'],
      'Social Science': ['ભારતનો વારસો', 'ભારતનો સાંસ્કૃતિક વારસો: પરંપરાઓ: હસ્ત અને લલિતકલા', 'ભારતનો સાંસ્કૃતિક વારસો: શિલ્પ અને સ્થાપત્ય', 'ભારતનો સાહિત્યિક વારસો', 'ભારતનો વિજ્ઞાન અને ટેકનોલોજીનો વારસો'],
      'Gujarati': ['વૈષ્ણવજન', 'રેસનો ઘોડો', 'શીલવંત સાધુને', 'ભૂતળ ભક્તિ પદાર્થ', 'શિકારીને'],
    }
  }
};

export const INITIAL_CONFIG: Config = {
  institutionName: 'My Awesome School',
  totalMarks: '100',
  examDate: '',
  standard: '7',
  subject: 'Science',
  medium: 'English',
  chapter: [CHAPTERS['7']['English']['Science'][0]],
  difficulty: 'Medium',
};

export const INITIAL_QUESTION_COUNTS: QuestionCounts = {
  mcqs: 5,
  shortAnswer: 3,
  longAnswer: 2,
  fillInTheBlanks: 5,
  trueFalse: 5,
};
