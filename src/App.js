import React, {Component} from 'react';
import './App.css';
import { Card, CardTitle, CardText} from 'reactstrap';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            >
            {value === index && (
            <Box border={0} p={3}>
            <Typography>{children}</Typography>
            </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            bannerImage: [],
            challenges : [],
            sportsType : [],
            loader     : false,
            value      : 0,
            criket     : [],
            football   : [],
            basketball : [],
            tennis     : [],
        }
    }


    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = (event) => {
        let scrollTop = event.srcElement.body.scrollTop,
            itemTranslate = Math.min(0, scrollTop/3 - 60);

        this.setState({
          transform: {height:"0px"}
        });
    }

   

    componentDidMount = () =>{
        window.addEventListener('scroll', this.handleScroll);
        this.setState({loader: true})
        fetch("http://localhost:3000/home")
            .then(res => res.json())
            .then(
                (result) => {
                    let criket = []
                    let football= []
                    let basketball =[]
                    let tennis =[]
                    result.challenges.forEach((value) =>{
                        if(value.sports_id == 1){
                            criket.push(value);
                        }
                        else if (value.sports_id == 3){
                            tennis.push(value);
                        }
                        else if(value.sports_id == 4){
                            football.push(value);
                        } 
                        else if(value.sports_id == 8){
                            basketball.push(value);
                        }
                    })
                    this.setState({
                        bannerImage: result ? result.banners : [],
                        challenges : result ? result.challenges : [],
                        sportsType : result ? result.sports :[],
                        loader     : false,
                        criket     : criket,
                        football   : football,
                        basketball : basketball,
                        tennis     : tennis
                    })
            },
            (error) => {
                }
            )
    }

    handleChange = (event, value) => {
        this.setState({value: value});
    }

    timeConverstion = (time) =>{
        var dateFirst = new Date(time);
         var dateSecond = new Date();
         var timeDiff = Math.abs(dateSecond.getTime() - dateFirst.getTime());
         var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

         if(daysDiff > 1){
            const formattedDate = dateFirst.toLocaleString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            return formattedDate;
        } else{
            const formattedDate = dateFirst.toLocaleString("en-GB", {
              hour: "numeric",
              minute: "2-digit"
            });
            return formattedDate;
        }
    }

    getContenstCards = (contests) => {
        return contests.map((item,index) =>{
            return <div className="col-md-12">
                    <Card className="common-sports-card-design" >
                        <CardTitle className="tagName mb-0">
                            <div className="d-flex col-md-12">
                                Picks
                            </div>
                        </CardTitle>
                        <CardText className="card-content mb-0 mt-1">
                            <div className="row d-flex common-card-body">
                                <div className="col-md-2 d-flex justify-content-center">
                                    <img src={item.match_parties[0].party_img_url ? item.match_parties[0].party_img_url : " "} style={{width:"35px", height:"35px", textAlign:"start"}}/>
                                </div>
                                <div className="col-md-8 text-center" style={{fontSize:"13px"}}>
                                    <div className="contest-parties">
                                        <span>{item.match_parties[0].meta_info != null ? item.match_parties[0].meta_info.party_short_name : "CH"}</span>
                                        &nbsp;<span>v</span>&nbsp;
                                        <span>{item.match_parties[1].meta_info != null ? item.match_parties[1].meta_info.party_short_name : "DM"}</span>&nbsp;
                                        <span>Test 1</span>
                                        {/*<span>{item.match_parties[1].meta_info != null ? item.match_parties[1].meta_info.party_short_name : "AUS"}</span>*/}
                                    </div>
                                    <div style={{color:"#a2a2a2"}}>
                                        <span>{item.desc ? item.desc : "Game Progress"}</span>&nbsp;
                                        <span><img src="/live-min.png" id="live-status" alt="" height="10px" width="10px" /></span>
                                        <span>{" Live Score Updates"}</span>
                                    </div>
                                    
                                </div>
                                <div className="col-md-2 d-flex justify-content-center">
                                    <img src={item.match_parties[1].party_img_url ? item.match_parties[1].party_img_url : " "} style={{width:"35px", height:"35px", textAlign:"end"}}/>
                                </div>
                            </div>
                        </CardText>
                        <div className="d-flex" style={{marginTop:"2px"}}>
                            <div className="col-md-6 prizeMoney">
                                <span><img src="/ruppe-min.png" id="ruppe-min" alt="" height="20px" width="20px" /></span><span className="prize-time-alignment" style={{fontWeight:"600"}}> {item.prize_money}</span>
                            </div>
                            <div className="col-md-6 d-flex startTime">
                                <span><img src="/timer-min.png" id="ruppe-min" alt="" height="15px" width="15px" /></span>&nbsp;
                                <span className="prize-time-alignment" style={{paddingTop:'1px'}}> {this.timeConverstion(item.start_time)}</span>
                            </div>
                        </div>
                    </Card>
                </div>
            })
    }

    render() {
        const {loader, bannerImage,challenges, sportsType,value, criket, basketball, football, tennis} = this.state
        console.log("banner", bannerImage)

        const MyBannerImageCard = !loader &&  bannerImage && bannerImage.length ? bannerImage.map((item,index) =>{

            return <div className="col-md-12">
                        <Card className="common-card-design" >
                            <CardTitle className="surveyName mb-0">
                                <span>
                                    <img src={item.img_url ? item.img_url : " "} style={{width:"100%", height:"188px"}}/>
                                </span>
                            </CardTitle>
                        </Card>
                    </div>

            }) : <div className="col-md-12 mb-5" style={{textAlign:"center"}}> Image Loader</div> 


        const mySportsCard = !loader &&  sportsType && sportsType.length ? sportsType.map((item,index) =>{

            return 
                    <Card className="common-sports-card-design" >
                        <CardTitle className="surveyName mb-0">
                            <span>
                                <img src={item.img_url ? item.img_url : " "} style={{width:"30px", height:"30px"}}/>
                            </span>
                        </CardTitle>
                    </Card>
                
            }) : <div className="col-md-12 mb-5" style={{textAlign:"center"}}> Image Loader</div>

        return (
             <div className ="d-flex justify-content-center">
                <div className=" " style={{height:"100vh", backgroundColor:"#f8f9fa", width:"40%"}}>
                        {/*<img src="/banenr_bg.jpg" id="banenr_bg" alt="" style={{position:"relative",width:"100%" }}/>*/}

                        <div className="" style={{backgroundImage:"url('banenr_bg.jpg')", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundSize: "70% 60%"}}>
                            <div className="col-md-12" style={{ height:"60px"}}>    
                                <div className="headingSection header pt-3">    
                                    <h5>Home</h5>   
                                </div>  
                            </div> 
                            { bannerImage.length ? 

                                <React.Fragment>
                                    <div className="justify-content-center bannerImageCard" style={this.state.transform}>
                                        {MyBannerImageCard}
                                    </div>
                                 </React.Fragment> : null 
                             }
                            
                        </div>
                  
                    <div className="" style={{backgroundColor: "#f8f9fa"}}>
                        <Paper >
                            <Tabs
                                value={value}
                                indicatorColor="primary"
                                // textColor="primary"
                                // variant="scrollable"
                                // scrollButtons="on"
                                onChange={this.handleChange}
                                aria-label="disabled tabs example"
                            >
                                <Tab style={{minWidth:"99px"}} label="ALL" icon={<img src={value ==0 && this.state.sportsType[0] ? this.state.sportsType[0].sports_img_url :  this.state.sportsType[0] ? this.state.sportsType[0].sports_unselected_img_url : ''} height="25px" width="25px" />}/>
                                <Tab style={{minWidth:"99px", border:"none"}} label="CRICKET" icon={<img src={value ==1 && this.state.sportsType[2] ? this.state.sportsType[2].sports_img_url :  this.state.sportsType[2] ? this.state.sportsType[2].sports_unselected_img_url : ''} height="25px" width="25px" />}/>
                                <Tab style={{minWidth:"99px", border:"none"}} label="FOOTBALL" icon={<img src={value == 2 && this.state.sportsType[7] ? this.state.sportsType[7].sports_img_url :  this.state.sportsType[7] ? this.state.sportsType[7].sports_unselected_img_url : ''} height="25px" width="25px" />}/>
                                <Tab style={{minWidth:"99px", border:"none"}} label="BASKETBALL" icon={<img src={value == 3 && this.state.sportsType[5] ? this.state.sportsType[5].sports_img_url :  this.state.sportsType[5] ? this.state.sportsType[5].sports_unselected_img_url : ''} height="25px" width="25px" />}/>
                                <Tab style={{minWidth:"99px", border:"none"}} label="TENNIS" icon={<img src={value == 4 && this.state.sportsType[3] ? this.state.sportsType[3].sports_img_url :  this.state.sportsType[3] ? this.state.sportsType[3].sports_unselected_img_url : ''} height="25px" width="25px" />}/>
                            </Tabs>
                        </Paper>
                        <TabPanel value={value} index={0}>
                            { challenges.length  ? 
                                <React.Fragment>
                                    <div className="allGames"><span>ALL GAMES </span>({challenges.length})</div>
                                    <div className="row justify-content-center mycontestChallangeCard mt-3">
                                        {this.getContenstCards(challenges)}
                                    </div>
                                </React.Fragment> : null 
                            }
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            { criket.length  ? 
                                <React.Fragment>
                                    <div className="allGames"><span>ALL GAMES </span>({criket.length})</div>
                                    <div className="row justify-content-center mycontestChallangeCard mt-3">
                                        {this.getContenstCards(criket)}
                                    </div>
                                </React.Fragment> : null 
                            }
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            { football.length  ? 
                                <React.Fragment>
                                    <div className="allGames"><span>ALL GAMES </span>({football.length})</div>
                                    <div className="row justify-content-center mycontestChallangeCard mt-3">
                                        {this.getContenstCards(football)}
                                    </div>
                                </React.Fragment> : null 
                            }
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            { basketball.length  ? 
                                <React.Fragment>
                                    <div className="allGames"><span>ALL GAMES </span>({basketball.length})</div>
                                    <div className="row justify-content-center mycontestChallangeCard mt-3">
                                        {this.getContenstCards(basketball)}
                                    </div>
                                </React.Fragment> : "There is no upcoming contests" 
                            }
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            {tennis.length  ? 
                                <React.Fragment>
                                    <div className="allGames"><span>ALL GAMES </span>({tennis.length})</div>
                                    <div className="row justify-content-center mycontestChallangeCard mt-3">
                                        {this.getContenstCards(tennis)}
                                    </div>
                                </React.Fragment> : null }
                        </TabPanel>
                    </div>
                    {/* challenges.length  ? 

                        <React.Fragment>
                            <div className="justify-content-center mycontestChallangeCard mt-3">
                                {contestChallengeCard}
                            </div>
                         </React.Fragment> : null 
                     */}
                </div>
            </div>
        )
    }
}
export default App;