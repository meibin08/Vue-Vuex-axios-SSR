
1、去重,统计出重复的次数，去除重复的字符，
var str = "dsfdsfre465463trewtpopokopofdgskjljhg";

const removeMore = (str) => {
	const count = {};
	const arr = str.split('');
	const result = [];
	for(let item of arr) {
		if(!count[item]) {
			count[item] = 1;
			result.push(item);
		} else {
			++count[item];
		}
	}
}




2、编写一个闭包的使用示例，

3、原型

	function fn(){
		this.name = "test";
		this.sex = 22;
	};

	var a = new fn();
	a.name = "dd";
	console.log(a.name); //？


4、react

class ConfirmPurchase extends Component {
	constructor(props) {
			super(props);
			this.state = {
					num:1,
			}
	}
	componentDidMount(){
		this.setState({num:2});
		this.setState({num:3});
		this.setState({num:4});
		this.setState({num:5});
		console.log(this.state.num);
	}
};