package medicineDataStruct

import (
	"github.com/stretchr/testify/assert"
	"testing"
	"time"
)

var testValues = []string{"1", "TESTNAME", "TESTFORM", "TESTROUTE", "TESTMAAUTH", "TESTMAAUTHTYPE", "TETSST", "12/03/1998", "TESTSTATE", "", "TESTOWNER", "OUI"}

func TestNewCisData(t *testing.T) {
	values := testValues
	cisData := NewCisData(values)
	assert.NotNil(t, cisData)
}

func TestNewCisData2(t *testing.T) {
	values := testValues
	cisData := NewCisData(values)
	var Int int
	var Date time.Time
	assert.IsType(t, Int, cisData.CIS)
	assert.IsType(t, Date, cisData.MADate)
}
