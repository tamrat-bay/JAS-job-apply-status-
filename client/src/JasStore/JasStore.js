export function createJasStore(){

  return {
      singleApplyData : {},
      isUserLogged: localStorage.getItem('jas_login') ? true : false,
      setIsUserLogged(){
          this.isUserLogged = !this.isUserLogged;
      },
      setSingleApplyData (applyData){
        this.singleApplyData = applyData
      }
    }
}