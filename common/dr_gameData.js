import {
	getGameList,getGameFavoriteList,getGamePlayedList, getGameFavorite, getGameLauch
} from "../api/game";

import utils from "../common/utils"


export default {
	

	async getHotGameData() {
		var gameType=uni.getStorageSync('gameTypeMenu')
		var category_id=gameType[0].id
		var hotGameData = uni.getStorageSync('hotGameData');
		if (!hotGameData) {

			const data = {
				category_id: category_id,
				platform_id: ''
			}
			const res = await getGameList(data);
			if(res.meta.code==0){
				hotGameData = res.data.rows
				uni.setStorageSync('hotGameData', hotGameData)
			}else{
				
			}
		}
		return hotGameData
	},
	
	async getGamesByGenre(category_id='', platform_id='',isHot='0'){
		var genre='game'+category_id+'_'+platform_id+'_'+isHot
		this.setStorageGameData(genre)
		var gameData = uni.getStorageSync(genre);
		if (!gameData) {
		
			const data = {
				category_id: category_id,
				platform_id: platform_id,
				is_hot:isHot,
			}
			const res = await getGameList(data);
			if(res.meta.code==0){
				gameData = res.data.rows
				uni.setStorageSync(genre, gameData)
			}else{
				
			}
		}
		return gameData
	},
	
	
	setStorageGameData(genre){
		if(uni.getStorageSync('gameTable')){
			var genreList=JSON.parse(uni.getStorageSync('gameTable'))
			var findIndex = genreList.findIndex(tempItem => tempItem === genre);
			if (findIndex == -1) {
				genreList.unshift(genre);
				uni.setStorageSync('gameTable', JSON.stringify(genreList))
			} 
			
		}else{
			var genreList=[]
			genreList.push(genre)
			uni.setStorageSync('gameTable',JSON.stringify(genreList))
		}
		
	},
	
	
	
	async getSlotsGameData(){
		var gameType=uni.getStorageSync('gameTypeMenu')
		var category_id=gameType[0].id
		var slotsGameData = uni.getStorageSync('slotsGameData');
		if (!slotsGameData) {
		
			const data = {
				category_id: category_id,
				platform_id: ''
			}
			const res = await getGameList(data);
			if(res.meta.code==0){
				slotsGameData = res.data.rows
				uni.setStorageSync('slotsGameData', slotsGameData)
			}else{
				
			}
		}
		return slotsGameData
	},
	
	
	//获取收藏列表
	async getFavoriteGamePlatform(platform_id) {
		var favoriteData=[]
		var favoriteGameData = uni.getStorageSync('favoriteGameData')
		if (favoriteGameData && favoriteGameData != '') {
			try {
				favoriteGameData = JSON.parse(favoriteGameData)
			} catch (e) {
				//TODO handle the exception
			}
			
		} else {
			if(utils.isLogin()){
				const res = await getGameFavoriteList();
				if(res.meta.code==0){
					favoriteGameData = res.data.rows
					uni.setStorageSync('favoriteGameData', JSON.stringify(favoriteGameData))
				}else{
					favoriteGameData=[]
					uni.setStorageSync('favoriteGameData', [])
				}
			}else{
				favoriteGameData=[]
				// uni.setStorageSync('favoriteGameData', JSON.stringify(favoriteGameData))
			}
			
			
		}
		
		if(platform_id!=0){
			favoriteGameData.forEach(item=>{
				if(item.sub_platform.id==platform_id){
					favoriteData.push(item)
				}
			})
		}else{
			favoriteData=favoriteGameData
		}
		
		return favoriteData
	
	},


	//获取收藏列表
	async getFavoriteGameData(category_id='') {
		var favoriteData=[]
		var favoriteGameData = uni.getStorageSync('favoriteGameData')
		if (favoriteGameData && favoriteGameData != '') {
			try {
				favoriteGameData = JSON.parse(favoriteGameData)
			} catch (e) {
				//TODO handle the exception
			}
			
		} else {
			if(utils.isLogin()){
				const res = await getGameFavoriteList();
				if(res.meta.code==0){
					favoriteGameData = res.data.rows
					uni.setStorageSync('favoriteGameData', JSON.stringify(favoriteGameData))
				}else{
					favoriteGameData=[]
					uni.setStorageSync('favoriteGameData', [])
				}
			}else{
				favoriteGameData=[]
				// uni.setStorageSync('favoriteGameData', JSON.stringify(favoriteGameData))
			}
			
			
		}
		
		if(category_id!=''){
			favoriteGameData.forEach(item=>{
				if(item.type==category_id){
					favoriteData.push(item)
				}
			})
		}else{
			favoriteData=favoriteGameData
		}
		
		return favoriteData

	},
	
	
	//获取玩过列表
	async getPlayedGamePlatform(platform_id) {
		var playedData=[]
		var playedGameData = uni.getStorageSync('playedGameData')
	
		if (playedGameData && playedGameData != '') {
			try {
				playedGameData = JSON.parse(playedGameData)
			} catch (e) {
				//TODO handle the exception
			}
			
		} else {
			
			if(utils.isLogin()){
				const res = await getGamePlayedList();
				if(res.meta.code==0){
					playedGameData = res.data.rows
					uni.setStorageSync('playedGameData', JSON.stringify(playedGameData))
				}else{
					playedGameData=[]
				}
			}else{
				playedGameData=[]
			}
				
		}
		
		if(platform_id!='0'){
			playedGameData.forEach(item=>{
				if(item.sub_platform.id==platform_id){
					playedData.push(item)
				}
			})
		}else{
			playedData=playedGameData
		}
		
		return playedData
	
	},
	
	
	//获取玩过列表
	async getPlayedGameData(category_id='') {
		var playedData=[]
		var playedGameData = uni.getStorageSync('playedGameData')
		if (playedGameData && playedGameData != '') {
			try {
				playedGameData = JSON.parse(playedGameData)
			} catch (e) {
				//TODO handle the exception
			}
			
		} else {
			
			if(utils.isLogin()){
				const res = await getGamePlayedList();
				if(res.meta.code==0){
					playedGameData = res.data.rows
					uni.setStorageSync('playedGameData', JSON.stringify(playedGameData))
				}else{
					playedGameData=[]
				}
			}else{
				playedGameData=[]
			}
				
		}
		
		if(category_id!=''){
			playedGameData.forEach(item=>{
				if(item.type==category_id){
					playedData.push(item)
				}
			})
		}else{
			playedData=playedGameData
		}
		
		return playedData
	
	},

	addCancelFavorite(item) {
		var favoriteGameData = uni.getStorageSync('favoriteGameData')
		if (favoriteGameData && favoriteGameData != '') {
			favoriteGameData = JSON.parse(favoriteGameData)
			var findIndex = favoriteGameData.findIndex(tempItem => tempItem.id === item.id);
			if (findIndex !== -1) {
				this.gameFavorite(item.id,'1')
				favoriteGameData.splice(findIndex, 1);
			} else {
				this.gameFavorite(item.id,'0')
				favoriteGameData.unshift(item);
			}
			uni.setStorageSync('favoriteGameData', JSON.stringify(favoriteGameData))
		} else {
			favoriteGameData = []
			favoriteGameData.push(item);
			uni.setStorageSync('favoriteGameData', JSON.stringify(favoriteGameData))
			this.gameFavorite(item.id,'1')	
		}
		// if (favoriteGameData.lenght < 1 || favoriteGameData == '') {

		// }

	},
	
	addPlayedGame(item){
		var playedGameData = uni.getStorageSync('playedGameData')
		if (playedGameData && playedGameData != '') {
			playedGameData = JSON.parse(playedGameData)
			var findIndex = playedGameData.findIndex(tempItem => tempItem.id === item.id);
			if (findIndex !== -1) {
				// playedGameData.splice(findIndex, 1);
			} else {
				playedGameData.unshift(item);
			}
			uni.setStorageSync('playedGameData', JSON.stringify(playedGameData))
		} else {
			playedGameData = []
			playedGameData.push(item);
			uni.setStorageSync('playedGameData', JSON.stringify(playedGameData))
		}
	},

	findIndex(item, favoriteGameData) {
		try {
			var findIndex = favoriteGameData.findIndex(tempItem => tempItem.id === item.id);
			if (findIndex !== -1) {
				return '../../static/search/btn_sc_on_2.png'
			} else {
				return '../../static/search/btn_sc_off_2.png'

			}
		} catch (e) {
			//TODO handle the exception
			return '../../static/search/btn_sc_off_2.png'
		}
	},
	
	async gameFavorite(gameId,isCancel){
		if(utils.isLogin()){
			const data = {
				game_id: gameId,
				is_cancel: isCancel,
			}
			const res = await getGameFavorite(data);
			if(res.meta.code==0){
				
			}else{
				
			}
		}
	},
	
	async launch(itme){
		const data = {
			game_id: itme,
		}
		const res = await getGameLauch(data);
		
		return res
	}
}
//游戏热门数据