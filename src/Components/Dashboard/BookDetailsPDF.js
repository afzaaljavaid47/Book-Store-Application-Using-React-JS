import { Document, Page, Text,Link,Svg,Line, View, StyleSheet,Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page:{
        margin:"10px"
    },
    colorTxt:{
        fontSize:12,
        margin:"5px 10px",
        color:'blue'
    },
    colorCommentTxt:{
      fontSize:14,
      margin:"10px 10px",
      color:'blue',
      fontWeight:'bold'
  },
    titleTxt:{
        fontSize:15,
        margin:"20px",
        color:'blue',
        textAlign:'center'
    },
    simpleTxt:{
        fontSize:12,
        margin:"5px 0px",
        textAlign:'justify',
        width:'450px'
    },
    flexView:{
        display:'flex',
        flexDirection:'row',
        marginRight:'50px'
    },
    flexViewComments:{
      display:'flex',
      flexDirection:'row',
      marginRight:'50px',
      marginLeft:'30px'
  },
    flexViewCommentData:{
      display:'flex',
      flexDirection:'row',
      marginLeft:'5px',
      marginRight:'10px'
  },
  commentData:{
    marginLeft:'30px',
    border:'1px solid blue',
    marginRight:'30px',
    marginBottom:'5px',
    paddingTop:'10px',
    paddingBottom:'10px'
  },
    image: {
        width:'300px',
        marginTop:'20px',
        marginBottom:'20px'
    },
    qrimage: {
      width:'150px'
  },
    footer: {
        fontSize: 10,
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        margin:'10px',
        textAlign: 'center',
      }
});
const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toLocaleString();
  };
const BookDetailsPDF = ({data}) => (
    
  <Document title='Book.it - Book Details Page'>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.titleTxt}>Book.it - Book Details Page</Text>
      </View>
      <View style={styles.flexView}>
        <Text style={styles.colorTxt}>Book Title : </Text>
        <Text style={styles.simpleTxt}>{data.BookTitle}</Text>
      </View>
      <View style={styles.flexView}>
        <Text style={styles.colorTxt}>Book Image : </Text>
        {data.BookImage.length>0?<Image style={styles.image} src={`${process.env.REACT_APP_API_BASE_URL}uploads/${data.BookImage[0]}`}/>:
        <Image style={styles.image} src='http://localhost:3000/images/main.jpeg'/>} 
        
      </View>
      <View style={styles.flexView}>
        <Text style={styles.colorTxt}>Book ISBN : </Text>
        <Text style={styles.simpleTxt}>{data.BookISBN}</Text>
      </View>
      <View style={styles.flexView}>
        <Text style={styles.colorTxt}>Book Summary : </Text>
        <Text style={styles.simpleTxt}>{data.BookSummary}</Text>
      </View>
      <View style={styles.flexView}>
        <Text style={styles.colorTxt}>Written By : </Text>
        <Text style={styles.simpleTxt}>{data.BookAuthor}</Text>
      </View>
      <View style={styles.flexView}>
        <Text style={styles.colorTxt}>Book Genre : </Text>
        <Text style={styles.simpleTxt}>{data.BookGenre}</Text>
      </View>
      <View style={styles.flexView}>
        <Text style={styles.colorTxt}>Book URL : </Text>
        <Link style={styles.simpleTxt} src={data.BookLink}>{data.BookLink}</Link>
      </View>
      <View style={styles.flexView}>
        <Text style={styles.colorCommentTxt}>Book Comments </Text>
      </View>
      {data.CommentData?.length>0?data.CommentData.map((data,index)=>(
      <View style={styles.commentData} key={index}>
        <View style={styles.flexViewCommentData}>
          <Text style={styles.colorTxt}>No : </Text>
          <Text style={styles.simpleTxt}>{++index}</Text>
        </View>
        <View style={styles.flexViewComments}>
          <Text style={styles.colorTxt}>Comment : </Text>
          <Text style={styles.simpleTxt}>{data.Comment}</Text>
        </View>
        <View style={styles.flexViewComments}>
          <Text style={styles.colorTxt}>By : </Text>
          <Text style={styles.simpleTxt}>{data.UserName}</Text>
        </View>
      </View>
      )):<View style={styles.flexViewComments}>
      <Text style={styles.colorTxt}>No any comments</Text>
    </View>}
      <View style={{margin:'30px 0px 0px 0px'}}>
      <Svg height="2" width="500">
        <Line
          x1={140}
          y1={0}
          x2={450}
          y2={0}
          strokeWidth={2}
          stroke="blue"
        />
      </Svg>
      </View>
      <View>
        <Text style={styles.titleTxt}>Book.it - Thanks for viewing this book</Text>
      </View>
      <View style={styles.footer}>
        <Text>{getCurrentDate()}</Text>
      </View>
     </Page>
  </Document>
);

export default BookDetailsPDF;